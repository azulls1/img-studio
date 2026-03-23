import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="navbar-inner" style="max-width: 1024px; margin: 0 auto">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center" style="flex-shrink: 0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
          </div>
          <h1 class="font-display font-bold text-forest" style="font-size: 16px">ImageGen Studio</h1>
        </div>
        <span class="badge badge-active" style="font-size: 11px">IA</span>
      </div>
    </nav>
  `,
})
export class HeaderComponent {}
