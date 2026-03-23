#!/bin/bash

# 🚀 Script de Deployment Seguro para Image Generator
# Autor: Samael Hernández
# Fecha: $(date)

echo "🔒 Iniciando deployment seguro..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
log_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    log_error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    log_error "Node.js no está instalado. Instala Node.js 18+ para continuar."
    exit 1
fi

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
    log_error "npm no está instalado."
    exit 1
fi

log_info "Verificando dependencias..."

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    log_info "Instalando dependencias..."
    npm install
    if [ $? -ne 0 ]; then
        log_error "Error instalando dependencias."
        exit 1
    fi
fi

# Limpiar build anterior
log_info "Limpiando build anterior..."
rm -rf dist/

# Build de producción
log_info "Compilando para producción..."
npm run build
if [ $? -ne 0 ]; then
    log_error "Error en el build de producción."
    exit 1
fi

# Verificación de seguridad
log_info "Ejecutando verificaciones de seguridad..."

# Verificar que no hay logs sensibles
log_info "Verificando logs sensibles..."
if grep -r "console\." dist/ > /dev/null 2>&1; then
    log_warning "Se encontraron console.log en el build. Revisando..."
    grep -r "console\." dist/ | grep -v "console.error" | grep -v "console.warn" || log_info "No se encontraron logs sensibles."
else
    log_info "✅ No se encontraron console.log sensibles."
fi

# Verificar source maps
log_info "Verificando source maps..."
if find dist/ -name "*.map" | grep -q .; then
    log_warning "Se encontraron source maps en producción:"
    find dist/ -name "*.map"
    log_warning "Considera deshabilitar source maps para mayor seguridad."
else
    log_info "✅ No se encontraron source maps (correcto para producción)."
fi

# Verificar tamaño del build
log_info "Verificando tamaño del build..."
BUILD_SIZE=$(du -sh dist/ | cut -f1)
log_info "Tamaño del build: $BUILD_SIZE"

# Verificar archivos críticos
log_info "Verificando archivos críticos..."
if [ ! -f "dist/index.html" ]; then
    log_error "index.html no encontrado en dist/"
    exit 1
fi

if [ ! -f "netlify.toml" ]; then
    log_warning "netlify.toml no encontrado. Creando..."
    # El archivo ya debería existir, pero por si acaso
fi

# Mostrar información del build
log_info "📊 Información del Build:"
echo "   📁 Directorio: $(pwd)/dist/"
echo "   📏 Tamaño: $BUILD_SIZE"
echo "   🔧 Configuración: Producción"
echo "   🌐 Plataforma: Netlify"

# Instrucciones de deployment
echo ""
log_info "🚀 Instrucciones para Netlify:"
echo "   1. Ve a tu dashboard de Netlify"
echo "   2. Arrastra la carpeta 'dist' al área de deployment"
echo "   3. O conecta tu repositorio Git para deployment automático"
echo "   4. Configura las variables de entorno si es necesario"
echo ""
log_info "📋 Archivos listos para deployment:"
ls -la dist/

echo ""
log_info "🎉 Build completado exitosamente!"
log_info "📁 Los archivos están listos en: $(pwd)/dist/"
log_warning "⚠️  Recuerda: La URL del webhook sigue siendo visible en el código JavaScript."
log_warning "⚠️  Para mayor seguridad, considera implementar un proxy backend."

echo ""
echo "🔒 Para verificar la seguridad después del deployment:"
echo "   1. Abre las herramientas de desarrollador del navegador"
echo "   2. Ve a la pestaña 'Sources' o 'Network'"
echo "   3. Verifica que no se expongan URLs sensibles"
echo "   4. Revisa la consola para logs no deseados"

