import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/generator/generator.component').then(m => m.GeneratorComponent),
  },
  {
    path: 'terminos',
    loadComponent: () =>
      import('./features/legal/terminos.component').then(m => m.TerminosComponent),
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./features/legal/privacidad.component').then(m => m.PrivacidadComponent),
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./features/legal/cookies.component').then(m => m.CookiesComponent),
  },
  {
    path: 'aviso-legal',
    loadComponent: () =>
      import('./features/legal/aviso-legal.component').then(m => m.AvisoLegalComponent),
  },
  {
    path: 'uso-aceptable',
    loadComponent: () =>
      import('./features/legal/uso-aceptable.component').then(m => m.UsoAceptableComponent),
  },
  {
    path: 'licencias',
    loadComponent: () =>
      import('./features/legal/licencias.component').then(m => m.LicenciasComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
