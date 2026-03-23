# Generador de Imágenes - Angular + Tailwind + n8n

Una aplicación SPA desarrollada en Angular 19 que permite generar imágenes mediante prompts de texto utilizando un webhook de n8n.

## 🚀 Características

- **Angular 19** con componentes standalone
- **Tailwind CSS** para estilos modernos y responsivos
- **Paleta IAgentek** (navy #0A1833, dorado #D4AF37, blanco #FFFFFF)
- **Formularios reactivos** con validaciones
- **Manejo de estados** (loading, error, éxito)
- **Gestión de memoria** con liberación automática de blobs
- **Proxy opcional** para evitar problemas de CORS
- **Comentarios inline** en español en todo el código

## 📋 Requisitos

- Node.js 20.x o 22.x LTS
- npm 10.x o superior
- Angular CLI 19

## 🛠️ Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd imagegen-ui
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Editar `src/environments/environment.development.ts` para desarrollo
   - Editar `src/environments/environment.ts` para producción

## 🚀 Uso

### Desarrollo
```bash
# Iniciar servidor de desarrollo
ng serve

# Abrir en navegador
ng serve -o
```

### Proxy (opcional, si hay problemas de CORS)
```bash
# Crear archivo .env basado en env.example
cp env.example .env

# Iniciar proxy en terminal separado
npm run proxy:dev

# Iniciar Angular en otra terminal
ng serve
```

### Producción
```bash
# Build de producción
ng build --configuration production

# Los archivos se generan en dist/imagegen-ui/
```

## 🔧 Configuración

### Variables de entorno

```typescript
export const environment = {
  production: false,
  WEBHOOK_URL: "https://devwebhook.personalizzimo.com/webhook/47c53930-2d1d-4705-b727-befe937e88da",
  USE_PROXY: false,
  PROXY_PATH: "/api/generate-image",
  REQUEST_TIMEOUT_MS: 60000,
  MAX_PROMPT_LENGTH: 1200,
};
```

### Proxy Node/Express

Si necesitas usar el proxy para evitar CORS:

1. **Instalar dependencias del proxy:**
   ```bash
   npm install express axios cors dotenv
   npm install -D ts-node typescript @types/node @types/express
   ```

2. **Configurar variables:**
   ```bash
   # Crear .env basado en env.example
   WEBHOOK_URL=https://devwebhook.personalizzimo.com/webhook/47c53930-2d1d-4705-b727-befe937e88da
   PORT=8080
   ```

3. **Cambiar configuración:**
   ```typescript
   // En environment.development.ts
   USE_PROXY: true
   ```

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── app/
│   │   ├── components/
│   │   │   └── image-generator.component.ts    # Componente principal
│   │   └── services/
│   │       └── image.service.ts                # Servicio HTTP
│   └── main.ts                                 # Bootstrap de la app
├── environments/
│   ├── environment.ts                          # Config producción
│   └── environment.development.ts              # Config desarrollo
└── styles.css                                  # Estilos globales Tailwind
```

## 🎨 Personalización

### Colores de marca

Los colores IAgentek están definidos en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      ianavy: "#0A1833",  // Azul marino
      iagold: "#D4AF37",  // Dorado metálico
    },
  },
}
```

### Validaciones

- **Prompt requerido:** Mínimo 5 caracteres
- **Límite máximo:** 1200 caracteres
- **Timeout:** 60 segundos
- **Contador visual:** Cambia de color según el uso (gris → amarillo → rojo)

## 🔒 Seguridad

- **Sanitización de URLs:** Usa `DomSanitizer` para URLs de blobs
- **Gestión de memoria:** Libera automáticamente `ObjectURL`s
- **Timeouts:** Evita requests colgados
- **Validación de entrada:** Sanitiza prompts del usuario

## 🚀 Despliegue

### Estático (Netlify/Vercel)
1. Hacer build: `ng build --configuration production`
2. Subir carpeta `dist/imagegen-ui/` al servicio
3. Configurar variables de entorno en el servicio

### Con proxy
1. Desplegar tanto Angular como el proxy Node
2. Usar reverse proxy (Nginx) para `/api/generate-image`
3. Configurar `USE_PROXY: true` en producción

## 🐛 Solución de problemas

### Error de CORS
```bash
# Activar proxy
npm run proxy:dev
# Cambiar USE_PROXY: true en environment
```

### Tailwind no funciona
```bash
# Verificar configuración
tailwind.config.js y postcss.config.js
```

### Build falla
```bash
# Limpiar caché
rm -rf node_modules dist
npm install
ng build
```

## 📝 API del webhook

### Request
```json
POST https://devwebhook.personalizzimo.com/webhook/47c53930-2d1d-4705-b727-befe937e88da
Content-Type: application/json

{
  "prompt": "Crea una imagen de un perro viajando hacia la luna con gafas de sol"
}
```

### Response
- **Content-Type:** `image/png`, `image/jpeg`, etc.
- **Body:** Binario de la imagen generada

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

Desarrollado con ❤️ usando Angular 19, Tailwind CSS y n8n.
