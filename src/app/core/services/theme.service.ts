import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Forest DS is light-mode only — no toggle needed
  readonly isDarkMode = signal(false);

  toggle(): void {
    // No-op: Forest Design System is light-mode only
  }
}
