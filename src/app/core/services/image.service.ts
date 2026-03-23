import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  created_at?: string;
}

const SESSION_KEY = 'imgstudio-session';
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

@Injectable({ providedIn: 'root' })
export class ImageService {
  private readonly baseUrl = environment.PROXY_PATH.replace('/generate-image', '');

  constructor(private http: HttpClient) {}

  getSessionId(): string | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;

      const session = JSON.parse(raw) as { id: string; created: number };
      const elapsed = Date.now() - session.created;

      if (elapsed > SESSION_TTL_MS) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }

      return session.id;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }

  createSession(): string {
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id, created: Date.now() }));
    return id;
  }

  ensureSession(): string {
    return this.getSessionId() ?? this.createSession();
  }

  generateImage(prompt: string): Observable<GeneratedImage> {
    const session_id = this.ensureSession();
    return this.http
      .post<GeneratedImage>(environment.PROXY_PATH, { prompt, session_id })
      .pipe(timeout(environment.REQUEST_TIMEOUT_MS));
  }

  getImages(): Observable<GeneratedImage[]> {
    const sessionId = this.getSessionId();
    if (!sessionId) {
      return new Observable(sub => { sub.next([]); sub.complete(); });
    }
    return this.http.get<GeneratedImage[]>(`${this.baseUrl}/images?session_id=${sessionId}`);
  }

  deleteImage(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.baseUrl}/images/${id}`);
  }
}
