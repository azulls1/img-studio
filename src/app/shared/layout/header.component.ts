import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <nav class="navbar" style="background: #04202C !important">
      <div class="navbar-inner" style="max-width: 1024px; margin: 0 auto">
        <div class="flex items-center gap-3">
          <img src="assets/icons/logo_ia_withe.webp" alt="IAGentek Logo" style="height: 32px; width: auto; flex-shrink: 0">
          <h1 class="font-display font-bold" style="font-size: 16px; color: #ffffff">ImageGen Studio</h1>
        </div>
        <img src="assets/icons/logo-iagentek.webp" alt="IAGentek" style="height: 28px; width: auto">
      </div>
    </nav>
  `,
})
export class HeaderComponent {}
