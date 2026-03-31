import { Component } from '@angular/core';
import { LegalPageComponent } from './legal-page.component';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [LegalPageComponent],
  template: `<app-legal-page [pageTitle]="title" [lastUpdated]="date" [sections]="sections" />`,
})
export class AvisoLegalComponent {
  title = 'Aviso Legal';
  date = '31 de marzo de 2026';
  sections = [
    {
      title: '1. Datos del Titular',
      content: '<strong>Razón Social:</strong> IAGentek<br><strong>Desarrollador:</strong> Samael Hernandez<br><strong>Correo electrónico:</strong> contacto&#64;iagentek.com.mx<br><strong>Sitio web:</strong> iagentek.com.mx',
    },
    {
      title: '2. Objeto del Sitio',
      content: 'ImageGen Studio es una aplicación web que permite la generación de imágenes mediante inteligencia artificial. El servicio se ofrece con fines creativos, educativos y profesionales.',
    },
    {
      title: '3. Propiedad Intelectual',
      content: 'El diseño, código fuente, logotipos, marcas y demás elementos que componen ImageGen Studio son propiedad de IAGentek o se utilizan con la debida licencia. Queda prohibida su reproducción, distribución o modificación sin autorización previa y por escrito.',
    },
    {
      title: '4. Contenido Generado por IA',
      content: 'Las imágenes generadas por el Servicio son creadas mediante modelos de inteligencia artificial de OpenAI. IAGentek no se hace responsable del uso que los usuarios den a las imágenes generadas. El usuario es el único responsable de verificar que el uso de las imágenes cumple con la legislación vigente y los derechos de terceros.',
    },
    {
      title: '5. Exclusión de Garantías',
      content: 'IAGentek no garantiza la disponibilidad continua e ininterrumpida del Servicio. No se garantiza que las imágenes generadas sean aptas para un propósito particular. El Servicio puede experimentar interrupciones por mantenimiento o causas ajenas a IAGentek.',
    },
    {
      title: '6. Limitación de Responsabilidad',
      content: 'IAGentek no será responsable de:<br><br>• Daños derivados del uso indebido del Servicio por parte del usuario.<br>• Contenido generado que infrinja derechos de terceros.<br>• Interrupciones del servicio por causas de fuerza mayor.<br>• Pérdida de datos o imágenes almacenadas.',
    },
    {
      title: '7. Enlaces a Terceros',
      content: 'El Servicio puede contener enlaces a sitios web de terceros. IAGentek no se responsabiliza del contenido, políticas de privacidad o prácticas de dichos sitios.',
    },
    {
      title: '8. Legislación y Jurisdicción',
      content: 'Este Aviso Legal se rige por la legislación de los Estados Unidos Mexicanos. Para la resolución de cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.',
    },
  ];
}
