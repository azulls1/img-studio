import { Component } from '@angular/core';
import { LegalPageComponent } from './legal-page.component';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [LegalPageComponent],
  template: `<app-legal-page [pageTitle]="title" [lastUpdated]="date" [sections]="sections" />`,
})
export class PrivacidadComponent {
  title = 'Política de Privacidad';
  date = '31 de marzo de 2026';
  sections = [
    {
      title: '1. Responsable del Tratamiento',
      content: 'IAGentek, con domicilio en México, es responsable del tratamiento de los datos personales recabados a través de ImageGen Studio.',
    },
    {
      title: '2. Datos que Recopilamos',
      content: 'Recopilamos la siguiente información:<br><br>• <strong>Datos de sesión:</strong> Identificador de sesión anónimo (UUID) almacenado localmente en su navegador.<br>• <strong>Prompts de texto:</strong> Las descripciones que usted ingresa para generar imágenes.<br>• <strong>Imágenes generadas:</strong> Las imágenes resultantes del proceso de generación.<br>• <strong>Datos técnicos:</strong> Dirección IP, tipo de navegador y sistema operativo (para fines de seguridad y rate limiting).',
    },
    {
      title: '3. Finalidad del Tratamiento',
      content: 'Los datos recopilados se utilizan exclusivamente para:<br><br>• Proveer el servicio de generación de imágenes.<br>• Asociar las imágenes generadas a su sesión de usuario.<br>• Garantizar la seguridad y el correcto funcionamiento del Servicio.<br>• Cumplir con obligaciones legales aplicables.',
    },
    {
      title: '4. Base Legal',
      content: 'El tratamiento de datos se realiza con base en el consentimiento del usuario al utilizar el Servicio, así como en el interés legítimo de IAGentek para mantener la seguridad de la plataforma.',
    },
    {
      title: '5. Almacenamiento y Conservación',
      content: 'Los datos de sesión se almacenan localmente en su navegador con una vigencia de 2 horas. Las imágenes generadas y sus metadatos se almacenan en servidores seguros de Supabase. Los datos se conservan mientras la sesión esté activa y pueden ser eliminados por el usuario en cualquier momento.',
    },
    {
      title: '6. Transferencia de Datos',
      content: 'Los prompts de texto son enviados a OpenAI (Estados Unidos) para el procesamiento de generación de imágenes. Esta transferencia es necesaria para la prestación del Servicio. OpenAI procesa estos datos conforme a su propia política de privacidad.',
    },
    {
      title: '7. Derechos del Usuario',
      content: 'Usted tiene derecho a:<br><br>• <strong>Acceso:</strong> Conocer qué datos tenemos sobre usted.<br>• <strong>Rectificación:</strong> Solicitar la corrección de datos inexactos.<br>• <strong>Cancelación:</strong> Solicitar la eliminación de sus datos.<br>• <strong>Oposición:</strong> Oponerse al tratamiento de sus datos.<br><br>Para ejercer estos derechos (derechos ARCO), contacte a: <strong>contacto&#64;iagentek.com.mx</strong>',
    },
    {
      title: '8. Seguridad',
      content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos, incluyendo cifrado HTTPS, rate limiting, validación de entrada y headers de seguridad.',
    },
    {
      title: '9. Cambios en esta Política',
      content: 'Nos reservamos el derecho de actualizar esta Política de Privacidad. Los cambios serán publicados en esta página con la fecha de última actualización.',
    },
  ];
}
