import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer" role="contentinfo">
      <p>
        Desarrollado por <strong class="text-forest">Samael Hernandez</strong>
        &bull; Todos los derechos reservados &copy; 2025
      </p>
      <p class="mt-1" style="color: var(--color-text-placeholder)">
        Angular 19 &bull; Tailwind CSS &bull; TypeScript &bull; OpenAI DALL-E 3
      </p>
    </footer>
  `,
})
export class FooterComponent {}
