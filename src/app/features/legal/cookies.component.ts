import { Component } from '@angular/core';
import { LegalPageComponent } from './legal-page.component';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [LegalPageComponent],
  template: `<app-legal-page [pageTitle]="title" [lastUpdated]="date" [sections]="sections" />`,
})
export class CookiesComponent {
  title = 'Política de Cookies';
  date = '31 de marzo de 2026';
  sections = [
    {
      title: '1. ¿Qué son las Cookies?',
      content: 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten al sitio recordar sus acciones y preferencias durante un periodo de tiempo.',
    },
    {
      title: '2. Cookies que Utilizamos',
      content: 'ImageGen Studio utiliza las siguientes tecnologías de almacenamiento local:<br><br>• <strong>LocalStorage - Session ID:</strong> Almacena un identificador de sesión anónimo (UUID) con una vigencia de 2 horas. Es estrictamente necesario para el funcionamiento del Servicio y permite asociar las imágenes generadas a su sesión.',
    },
    {
      title: '3. Cookies de Terceros',
      content: 'Actualmente, ImageGen Studio no utiliza cookies de terceros, cookies de análisis ni cookies publicitarias. No realizamos seguimiento del comportamiento del usuario con fines de marketing.',
    },
    {
      title: '4. Cookies Técnicas',
      content: 'Las cookies/almacenamiento técnico utilizado es estrictamente necesario para la prestación del Servicio. Sin el identificador de sesión, no sería posible asociar las imágenes generadas a su sesión de navegación.',
    },
    {
      title: '5. Gestión de Cookies',
      content: 'Puede gestionar y eliminar las cookies/datos de almacenamiento local a través de la configuración de su navegador. Tenga en cuenta que la eliminación del almacenamiento local provocará la pérdida de la asociación con las imágenes generadas previamente en su sesión.',
    },
    {
      title: '6. Actualizaciones',
      content: 'Esta Política de Cookies puede ser actualizada para reflejar cambios en las prácticas de almacenamiento. Le recomendamos revisar esta página periódicamente.',
    },
  ];
}
