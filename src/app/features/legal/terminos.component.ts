import { Component } from '@angular/core';
import { LegalPageComponent } from './legal-page.component';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [LegalPageComponent],
  template: `<app-legal-page [pageTitle]="title" [lastUpdated]="date" [sections]="sections" />`,
})
export class TerminosComponent {
  title = 'Términos y Condiciones';
  date = '31 de marzo de 2026';
  sections = [
    {
      title: '1. Aceptación de los Términos',
      content: 'Al acceder y utilizar ImageGen Studio ("el Servicio"), usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al Servicio.',
    },
    {
      title: '2. Descripción del Servicio',
      content: 'ImageGen Studio es una plataforma de generación de imágenes mediante inteligencia artificial, desarrollada por IAGentek. El Servicio utiliza modelos de IA de terceros (OpenAI DALL-E) para generar imágenes a partir de descripciones textuales proporcionadas por el usuario.',
    },
    {
      title: '3. Uso Permitido',
      content: 'El usuario se compromete a utilizar el Servicio únicamente para fines lícitos y de acuerdo con estos Términos. Queda prohibido:<br><br>• Generar contenido ilegal, ofensivo, difamatorio o que infrinja derechos de terceros.<br>• Utilizar el Servicio para crear material que promueva la violencia, el odio o la discriminación.<br>• Intentar eludir las restricciones técnicas o de contenido del Servicio.<br>• Realizar ingeniería inversa, descompilar o desensamblar el Servicio.<br>• Utilizar sistemas automatizados para realizar solicitudes masivas.',
    },
    {
      title: '4. Propiedad Intelectual',
      content: 'Las imágenes generadas a través del Servicio están sujetas a los términos de uso de OpenAI. El usuario reconoce que IAGentek no reclama propiedad sobre las imágenes generadas, pero tampoco garantiza derechos exclusivos sobre las mismas. La marca, logotipos y diseño de ImageGen Studio son propiedad de IAGentek.',
    },
    {
      title: '5. Limitación de Responsabilidad',
      content: 'El Servicio se proporciona "tal cual" y "según disponibilidad". IAGentek no garantiza que el Servicio sea ininterrumpido, libre de errores o que cumpla con requisitos específicos del usuario. En ningún caso IAGentek será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso del Servicio.',
    },
    {
      title: '6. Privacidad y Datos',
      content: 'El tratamiento de datos personales se rige por nuestra Política de Privacidad. Al utilizar el Servicio, el usuario consiente el procesamiento de los prompts y las imágenes generadas conforme a dicha política.',
    },
    {
      title: '7. Disponibilidad y Modificaciones',
      content: 'IAGentek se reserva el derecho de modificar, suspender o discontinuar el Servicio en cualquier momento sin previo aviso. Asimismo, estos Términos pueden ser actualizados periódicamente, siendo responsabilidad del usuario revisarlos regularmente.',
    },
    {
      title: '8. Legislación Aplicable',
      content: 'Estos Términos se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos Mexicanos. Cualquier controversia derivada de estos Términos será sometida a la jurisdicción de los tribunales competentes de la Ciudad de México.',
    },
    {
      title: '9. Contacto',
      content: 'Para cualquier consulta relacionada con estos Términos, puede contactarnos en: <strong>contacto&#64;iagentek.com.mx</strong>',
    },
  ];
}
