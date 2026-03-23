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

@Injectable({ providedIn: 'root' })
export class ImageService {
  private readonly baseUrl = environment.PROXY_PATH.replace('/generate-image', '');

  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<GeneratedImage> {
    return this.http
      .post<GeneratedImage>(environment.PROXY_PATH, { prompt })
      .pipe(timeout(environment.REQUEST_TIMEOUT_MS));
  }

  getImages(): Observable<GeneratedImage[]> {
    return this.http.get<GeneratedImage[]>(`${this.baseUrl}/images`);
  }

  deleteImage(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.baseUrl}/images/${id}`);
  }
}
