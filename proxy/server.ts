import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import type { Request, Response } from 'express';

const app = express();

// Security headers
app.use(helmet());

// CORS - restrict to allowed origins
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:4200').split(',');
app.use(cors({ origin: ALLOWED_ORIGINS }));

// Rate limiting - 20 requests per minute per IP
app.use(rateLimit({
  windowMs: 60_000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
}));

app.use(express.json({ limit: '1mb' }));

// OpenAI client
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const IMAGE_MODEL = (process.env.IMAGE_MODEL || 'dall-e-3') as 'dall-e-2' | 'dall-e-3';
const IMAGE_SIZE = (process.env.IMAGE_SIZE || '1024x1024') as '1024x1024' | '1024x1792' | '1792x1024' | '256x256' | '512x512';
const IMAGE_QUALITY = (process.env.IMAGE_QUALITY || 'standard') as 'standard' | 'hd';
const PORT = Number(process.env.PORT || 8080);
const MAX_PROMPT_LENGTH = 1200;

// Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://iagenteksupabase.iagentek.com.mx';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Helper: upload image to Supabase Storage + insert metadata
async function saveToSupabase(buffer: Buffer, prompt: string, sessionId: string): Promise<{ id: string; url: string } | null> {
  if (!SUPABASE_SERVICE_KEY) {
    console.log('SUPABASE_SERVICE_KEY not set, skipping storage');
    return null;
  }

  try {
    const id = crypto.randomUUID();
    const filePath = `images/${id}.png`;

    // Upload to Storage
    const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/imgstudio/${filePath}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'image/png',
        'x-upsert': 'true',
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.error('Supabase upload error:', err);
      return null;
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/imgstudio/${filePath}`;

    // Insert metadata
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/iagentek_imgstudio_images`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        id,
        prompt,
        file_path: filePath,
        file_size: buffer.length,
        session_id: sessionId,
      }),
    });

    if (!insertRes.ok) {
      const err = await insertRes.text();
      console.error('Supabase insert error:', err);
      return null;
    }

    const [record] = await insertRes.json() as any[];
    console.log(`[${new Date().toISOString()}] Saved to Supabase: ${publicUrl}`);
    return { id: record.id, url: publicUrl };
  } catch (err) {
    console.error('Supabase save error:', err);
    return null;
  }
}

app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt, session_id } = req.body as { prompt?: string; session_id?: string };

    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required and must be a string.' });
      return;
    }
    if (!session_id) {
      res.status(400).json({ error: 'session_id is required.' });
      return;
    }

    const trimmed = prompt.trim();
    if (trimmed.length < 5 || trimmed.length > MAX_PROMPT_LENGTH) {
      res.status(400).json({ error: `Prompt must be between 5 and ${MAX_PROMPT_LENGTH} characters.` });
      return;
    }

    console.log(`[${new Date().toISOString()}] Generating image: "${trimmed.substring(0, 80)}..."`);

    // Call OpenAI DALL-E API
    const response = await openai.images.generate({
      model: IMAGE_MODEL,
      prompt: trimmed,
      n: 1,
      size: IMAGE_SIZE,
      quality: IMAGE_QUALITY,
      response_format: 'b64_json',
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) {
      res.status(502).json({ error: 'No image data received from OpenAI.' });
      return;
    }

    const buffer = Buffer.from(b64, 'base64');

    // Save to Supabase
    const saved = await saveToSupabase(buffer, trimmed, session_id);

    // Return JSON with image URL and metadata
    if (saved) {
      res.json({
        id: saved.id,
        url: saved.url,
        prompt: trimmed,
      });
    } else {
      // Fallback: return image as binary if Supabase is not configured
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Length', buffer.length);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.send(buffer);
    }

    console.log(`[${new Date().toISOString()}] Image generated successfully (${buffer.length} bytes)`);
  } catch (err: any) {
    const status = err.status || 502;
    console.error(`[${new Date().toISOString()}] OpenAI error:`, err.message || err);

    if (err.code === 'content_policy_violation') {
      res.status(400).json({ error: 'The prompt was rejected by the content policy. Please try a different description.' });
      return;
    }
    if (err.code === 'rate_limit_exceeded') {
      res.status(429).json({ error: 'OpenAI rate limit reached. Please wait a moment and try again.' });
      return;
    }
    if (err.code === 'insufficient_quota') {
      res.status(402).json({ error: 'OpenAI API quota exceeded. Please check your billing.' });
      return;
    }

    res.status(status).json({
      error: 'Image generation failed',
      detail: process.env.NODE_ENV === 'development' ? String(err.message || err) : undefined,
    });
  }
});

// Get images by session
app.get('/api/images', async (req: Request, res: Response) => {
  if (!SUPABASE_SERVICE_KEY) {
    res.json([]);
    return;
  }

  const sessionId = req.query.session_id as string;
  if (!sessionId) {
    res.json([]);
    return;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/iagentek_imgstudio_images?session_id=eq.${sessionId}&order=created_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      res.status(502).json({ error: 'Failed to fetch images' });
      return;
    }

    const images = await response.json() as any[];
    const result = images.map((img: any) => ({
      id: img.id,
      prompt: img.prompt,
      url: `${SUPABASE_URL}/storage/v1/object/public/imgstudio/${img.file_path}`,
      created_at: img.created_at,
    }));

    res.json(result);
  } catch (err) {
    console.error('Fetch images error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete image
app.delete('/api/images/:id', async (req: Request, res: Response) => {
  if (!SUPABASE_SERVICE_KEY) {
    res.status(404).json({ error: 'Not configured' });
    return;
  }

  try {
    const { id } = req.params;

    // Get file_path first
    const getRes = await fetch(
      `${SUPABASE_URL}/rest/v1/iagentek_imgstudio_images?id=eq.${id}&select=file_path`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
      }
    );

    const records = await getRes.json() as any[];
    if (!records.length) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const filePath = records[0].file_path;

    // Delete from storage
    await fetch(`${SUPABASE_URL}/storage/v1/object/imgstudio/${filePath}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    });

    // Delete metadata
    await fetch(`${SUPABASE_URL}/rest/v1/iagentek_imgstudio_images?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    model: IMAGE_MODEL,
    size: IMAGE_SIZE,
    supabase: SUPABASE_SERVICE_KEY ? 'connected' : 'not configured',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Image Generator Proxy running on http://localhost:${PORT}`);
  console.log(`  Model: ${IMAGE_MODEL} | Size: ${IMAGE_SIZE} | Quality: ${IMAGE_QUALITY}`);
  console.log(`  CORS origins: ${ALLOWED_ORIGINS.join(', ')}`);
  console.log(`  Supabase: ${SUPABASE_SERVICE_KEY ? SUPABASE_URL : 'not configured'}`);
  console.log(`  Rate limit: 20 req/min`);
});
