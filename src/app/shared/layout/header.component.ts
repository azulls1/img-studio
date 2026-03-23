import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
          </div>
          <h1 class="font-display text-lg font-bold text-forest">ImageGen Studio</h1>
        </div>
        <span class="badge badge-active">DALL-E 3</span>
      </div>
    </nav>
  `,
})
export class HeaderComponent {}
