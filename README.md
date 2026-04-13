# ImageGen Studio - Angular 19 + DALL-E 3 + FastAPI

Aplicacion SPA para generar imagenes con IA mediante prompts de texto. Usa OpenAI DALL-E 3 como motor de generacion, FastAPI como backend, Celery + Redis para procesamiento asincrono y MinIO/Supabase para almacenamiento.

## Arquitectura

```
                    +-----------+
                    |  Angular  |  :3500 (dev) / :80 (prod)
                    +-----+-----+
                          |
                    +-----v-----+
                    |  FastAPI   |  :8080
                    +-----+-----+
                          |
                +---------+---------+
                |                   |
          +-----v-----+     +------v------+
          |   Redis    |     |   Celery    |
          |   :6379    |     |   Worker    |
          +------------+     +------+------+
                                    |
                          +---------+---------+
                          |                   |
                    +-----v-----+     +------v------+
                    |   MinIO   |     |  Supabase   |
                    | (storage) |     | (metadata)  |
                    +-----------+     +-------------+
```

## Stack

- **Frontend:** Angular 19, Tailwind CSS, componentes standalone
- **Backend:** FastAPI (Python 3.12), Celery 5.4, Redis 7
- **IA:** OpenAI DALL-E 3
- **Storage:** MinIO (imagenes) + Supabase (metadata)
- **Infra:** Docker, Docker Swarm (produccion), Traefik (reverse proxy)

## Requisitos

- Node.js 20.x o 22.x LTS
- Docker Desktop
- Angular CLI 19

## Desarrollo local

### 1. Levantar backend con Docker

```bash
cd imagegen-ui

# Configurar variables de entorno
cp env.example .env
# Editar .env con tus API keys (OPENAI_API_KEY, SUPABASE_SERVICE_KEY)

# Levantar redis + api + worker
docker compose up -d
```

Esto levanta:
- **API (FastAPI):** http://localhost:8081
- **Celery Worker:** procesamiento en background
- **Redis:** cola de mensajes

### 2. Levantar frontend

```bash
npm install
ng serve -o
```

Frontend disponible en http://localhost:3500

### 3. Verificar que todo funcione

```bash
# Health check del API
curl http://localhost:8081/api/health
```

### Parar todo

```bash
docker compose down
```

## Estructura del proyecto

```
src/
├── app/
│   ├── core/services/
│   │   ├── image.service.ts        # Servicio de generacion (API + polling)
│   │   ├── gallery.service.ts      # Servicio de galeria
│   │   └── theme.service.ts        # Servicio de tema
│   ├── features/
│   │   ├── generator/              # Componente principal de generacion
│   │   └── legal/                  # Paginas legales
│   ├── shared/layout/
│   │   ├── header.component.ts     # Header con logo
│   │   └── footer.component.ts     # Footer con links legales
│   ├── ui/                         # Componentes UI reutilizables
│   │   ├── alert/
│   │   ├── button/
│   │   ├── image-preview/
│   │   ├── label/
│   │   ├── spinner/
│   │   └── textarea/
│   ├── app.routes.ts               # Rutas (lazy loading)
│   └── app.config.ts               # Configuracion de la app
├── assets/icons/                   # Logos IAGentek
├── environments/                   # Configuracion por entorno
└── styles.css                      # Estilos globales Tailwind
backend/
├── app/
│   ├── main.py                     # FastAPI endpoints
│   ├── config.py                   # Variables de entorno
│   ├── celery_app.py               # Configuracion Celery
│   ├── tasks.py                    # Tasks de generacion
│   ├── storage.py                  # Cliente MinIO (S3)
│   └── database.py                 # Cliente Supabase
└── requirements.txt
```

## API Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | `/api/generate-image` | Encola generacion de imagen |
| GET | `/api/jobs/{job_id}` | Estado del job (polling) |
| GET | `/api/images?session_id=X` | Listar imagenes por sesion |
| DELETE | `/api/images/{id}` | Eliminar imagen |
| GET | `/api/health` | Health check |

## Variables de entorno

```bash
OPENAI_API_KEY=sk-...              # API key de OpenAI
SUPABASE_URL=https://...           # URL de Supabase
SUPABASE_SERVICE_KEY=eyJ...        # Service key de Supabase
IMAGE_MODEL=dall-e-3               # Modelo de generacion
IMAGE_SIZE=1024x1024               # Tamano de imagen
IMAGE_QUALITY=standard             # Calidad (standard/hd)
```

## Despliegue (produccion)

El proyecto se despliega en un VPS con Docker Swarm + Traefik:

```bash
# Build de imagenes
docker build -f Dockerfile.frontend -t imagenstudio-frontend .
docker build -f Dockerfile.backend -t imagenstudio-api .
docker build -f Dockerfile.worker -t imagenstudio-worker .

# Deploy con stack
docker stack deploy -c deploy/imagenstudio.yaml imagenstudio
```

URL de produccion: `https://imagenstudio.iagentek.com.mx`

## Colores de marca

```javascript
// tailwind.config.js
colors: {
  ianavy: "#0A1833",  // Azul marino
  iagold: "#D4AF37",  // Dorado metalico
}
```

## Autor

Desarrollado por IAGentek.
