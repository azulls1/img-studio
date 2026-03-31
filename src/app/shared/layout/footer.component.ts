import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer role="contentinfo" style="background: #04202C; color: #C9D1C8; padding: 0;">

      <!-- Main footer -->
      <div style="max-width: 1024px; margin: 0 auto; padding: 40px 24px 24px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px;">

          <!-- Brand -->
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <img src="assets/icons/logo_ia_withe.webp" alt="IAGentek" style="height: 28px; width: auto;">
              <span class="font-display font-bold" style="font-size: 16px; color: #fff;">ImageGen Studio</span>
            </div>
            <p style="font-size: 13px; line-height: 1.6; color: #9EADA3;">
              Plataforma de generación de imágenes con inteligencia artificial. Potenciada por OpenAI DALL-E 3.
            </p>
          </div>

          <!-- Legal -->
          <div>
            <h4 style="font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Legal</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
              <li><a routerLink="/terminos" style="font-size: 13px; color: #9EADA3; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9EADA3'">Términos y Condiciones</a></li>
              <li><a routerLink="/privacidad" style="font-size: 13px; color: #9EADA3; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9EADA3'">Política de Privacidad</a></li>
              <li><a routerLink="/cookies" style="font-size: 13px; color: #9EADA3; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9EADA3'">Política de Cookies</a></li>
              <li><a routerLink="/aviso-legal" style="font-size: 13px; color: #9EADA3; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9EADA3'">Aviso Legal</a></li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 style="font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Recursos</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
              <li><a routerLink="/uso-aceptable" style="font-size: 13px; color: #9EADA3; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9EADA3'">Uso Aceptable</a></li>
              <li><a routerLink="/licencias" style="font-size: 13px; color: #9EADA3; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9EADA3'">Licencias de Contenido</a></li>
              <li><a href="mailto:contacto@iagentek.com.mx" style="font-size: 13px; color: #9EADA3; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9EADA3'">Contacto</a></li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Divider -->
      <div style="max-width: 1024px; margin: 0 auto; padding: 0 24px;">
        <hr style="border: none; border-top: 1px solid rgba(158, 173, 163, 0.2); margin: 0;">
      </div>

      <!-- Bottom bar -->
      <div style="max-width: 1024px; margin: 0 auto; padding: 16px 24px;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
          <p style="font-size: 12px; color: #9EADA3; margin: 0;">
            &copy; {{ currentYear }} <strong style="color: #fff;">IAGentek</strong> &mdash; Desarrollado por <strong style="color: #fff;">Samael Hernandez</strong>. Todos los derechos reservados.
          </p>
          <p style="font-size: 11px; color: #5B7065; margin: 0;">
            Angular 19 &bull; Tailwind CSS &bull; TypeScript &bull; OpenAI DALL-E 3
          </p>
        </div>
      </div>

    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
