import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer, switchMap, takeWhile, tap, map, timeout, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  created_at?: string;
}

interface JobResponse {
  job_id: string;
  status: string;
}

interface JobStatus {
  job_id: string;
  status: string;
  result?: GeneratedImage;
  error?: string;
  meta?: any;
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

  ensureSession(): string {
    const existing = this.getSessionId();
    if (existing) return existing;

    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id, created: Date.now() }));
    return id;
  }

  generateImage(prompt: string): Observable<GeneratedImage> {
    const session_id = this.ensureSession();
    const result$ = new Subject<GeneratedImage>();

    this.http
      .post<JobResponse>(environment.PROXY_PATH, { prompt, session_id })
      .pipe(timeout(10000))
      .subscribe({
        next: (job) => {
          // Poll for job completion
          timer(500, 2000).pipe(
            switchMap(() => this.http.get<JobStatus>(`${this.baseUrl}/jobs/${job.job_id}`)),
            takeWhile(status => !['COMPLETED', 'FAILED'].includes(status.status), true),
          ).subscribe({
            next: (status) => {
              if (status.status === 'COMPLETED' && status.result) {
                result$.next(status.result);
                result$.complete();
              } else if (status.status === 'FAILED') {
                result$.error({ error: { error: status.error || 'Image generation failed' }, status: 500 });
              }
            },
            error: (err) => result$.error(err),
          });
        },
        error: (err) => result$.error(err),
      });

    return result$.asObservable();
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
