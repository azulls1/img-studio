import { Component } from '@angular/core';
import { LegalPageComponent } from './legal-page.component';

@Component({
  selector: 'app-licencias',
  standalone: true,
  imports: [LegalPageComponent],
  template: `<app-legal-page [pageTitle]="title" [lastUpdated]="date" [sections]="sections" />`,
})
export class LicenciasComponent {
  title = 'Licencias de Contenido';
  date = '31 de marzo de 2026';
  sections = [
    {
      title: '1. Imágenes Generadas',
      content: 'Las imágenes generadas a través de ImageGen Studio utilizan el modelo DALL-E 3 de OpenAI. Los derechos sobre las imágenes generadas están sujetos a los términos de uso de OpenAI, que actualmente permiten al usuario utilizar las imágenes generadas para fines comerciales y no comerciales.',
    },
    {
      title: '2. Responsabilidad del Usuario',
      content: 'El usuario es responsable de:<br><br>• Verificar que las imágenes generadas no infrinjan derechos de terceros antes de su uso comercial.<br>• Cumplir con las leyes de propiedad intelectual aplicables en su jurisdicción.<br>• Obtener los permisos necesarios si las imágenes se asemejan a personas, marcas o obras protegidas.',
    },
    {
      title: '3. Uso Comercial',
      content: 'Conforme a los términos actuales de OpenAI, las imágenes generadas pueden utilizarse con fines comerciales. Sin embargo, IAGentek recomienda revisar periódicamente los términos de OpenAI, ya que estos pueden cambiar.',
    },
    {
      title: '4. Atribución',
      content: 'No se requiere atribución a ImageGen Studio ni a IAGentek al utilizar las imágenes generadas. Sin embargo, agradecemos cualquier mención voluntaria.',
    },
    {
      title: '5. Software de Terceros',
      content: 'ImageGen Studio utiliza software de código abierto bajo sus respectivas licencias:<br><br>• <strong>Angular:</strong> MIT License<br>• <strong>Tailwind CSS:</strong> MIT License<br>• <strong>OpenAI SDK:</strong> Apache 2.0 License<br>• <strong>Express:</strong> MIT License',
    },
    {
      title: '6. Descargo de Responsabilidad',
      content: 'IAGentek no garantiza que las imágenes generadas estén libres de similitudes con obras existentes protegidas por derechos de autor. El usuario asume toda responsabilidad legal derivada del uso de las imágenes generadas.',
    },
  ];
}
