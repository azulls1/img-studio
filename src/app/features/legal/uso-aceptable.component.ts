import { Component } from '@angular/core';
import { LegalPageComponent } from './legal-page.component';

@Component({
  selector: 'app-uso-aceptable',
  standalone: true,
  imports: [LegalPageComponent],
  template: `<app-legal-page [pageTitle]="title" [lastUpdated]="date" [sections]="sections" />`,
})
export class UsoAceptableComponent {
  title = 'Política de Uso Aceptable';
  date = '31 de marzo de 2026';
  sections = [
    {
      title: '1. Propósito',
      content: 'Esta política establece las normas de uso aceptable de ImageGen Studio para garantizar un entorno seguro y respetuoso para todos los usuarios.',
    },
    {
      title: '2. Uso Permitido',
      content: 'Se permite el uso del Servicio para:<br><br>• Creación de contenido artístico y creativo.<br>• Generación de imágenes para proyectos personales y profesionales.<br>• Prototipado y diseño conceptual.<br>• Fines educativos y de investigación.',
    },
    {
      title: '3. Uso Prohibido',
      content: 'Queda estrictamente prohibido generar contenido que:<br><br>• Sea ilegal bajo la legislación mexicana o internacional.<br>• Contenga material sexualmente explícito o pornográfico.<br>• Promueva la violencia, el terrorismo o actividades delictivas.<br>• Sea discriminatorio por razones de raza, género, orientación sexual, religión o nacionalidad.<br>• Infrinja derechos de autor, marcas registradas o propiedad intelectual de terceros.<br>• Suplante la identidad de personas reales sin su consentimiento.<br>• Contenga información falsa con intención de engañar (deepfakes maliciosos).<br>• Constituya acoso, intimidación o difamación.',
    },
    {
      title: '4. Límites de Uso',
      content: 'Para garantizar la calidad del servicio para todos los usuarios:<br><br>• Se aplica un límite de 20 solicitudes por minuto por dirección IP.<br>• Los prompts deben tener entre 5 y 1,200 caracteres.<br>• No se permite el uso de bots o sistemas automatizados para generar solicitudes masivas.',
    },
    {
      title: '5. Consecuencias',
      content: 'El incumplimiento de esta política puede resultar en:<br><br>• Suspensión temporal del acceso al Servicio.<br>• Bloqueo permanente de la dirección IP.<br>• Eliminación del contenido generado.<br>• Reporte a las autoridades competentes en caso de actividad ilegal.',
    },
    {
      title: '6. Reporte de Abuso',
      content: 'Si detecta un uso indebido del Servicio, por favor repórtelo a: <strong>contacto&#64;iagentek.com.mx</strong>',
    },
  ];
}
