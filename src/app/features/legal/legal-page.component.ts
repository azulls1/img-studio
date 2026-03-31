import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LegalSection {
  title: string;
  content: string;
}

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="max-width: 768px; margin: 0 auto; padding: 40px 24px 60px;">
      <a routerLink="/" style="font-size: 13px; color: #5B7065; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 24px;">
        &larr; Volver al inicio
      </a>
      <h1 class="font-display font-bold text-forest" style="font-size: 28px; margin-bottom: 8px;">{{ pageTitle }}</h1>
      <p style="font-size: 13px; color: #9EADA3; margin-bottom: 32px;">Última actualización: {{ lastUpdated }}</p>

      @for (section of sections; track section.title) {
        <div style="margin-bottom: 28px;">
          <h2 class="font-display font-bold text-forest" style="font-size: 18px; margin-bottom: 10px;">{{ section.title }}</h2>
          <div style="font-size: 14px; line-height: 1.8; color: #304040;" [innerHTML]="section.content"></div>
        </div>
      }
    </div>
  `,
})
export class LegalPageComponent {
  @Input() pageTitle = '';
  @Input() lastUpdated = '';
  @Input() sections: LegalSection[] = [];
}
