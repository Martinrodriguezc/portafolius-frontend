#!/bin/bash

# Script para ejecutar tests de componentes principales
# Uso: ./scripts/test-components.sh [opción]

echo "🧪 Testing de Componentes Principales - PortafoliUS"
echo "=================================================="

case "$1" in
  "common")
    echo "🔧 Ejecutando tests de componentes comunes..."
    npm test -- --testPathPattern="src/components/common" --verbose
    ;;
  "auth")
    echo "🔐 Ejecutando tests de componentes de autenticación..."
    npm test -- --testPathPattern="src/components/auth" --verbose
    ;;
  "hooks")
    echo "🪝 Ejecutando tests de hooks..."
    npm test -- --testPathPattern="src/hooks" --verbose
    ;;
  "coverage")
    echo "📊 Ejecutando tests con reporte de cobertura..."
    npm run test:coverage -- --testPathPattern="(src/components/common|src/components/auth|src/hooks/form)"
    ;;
  "watch")
    echo "👀 Ejecutando tests en modo watch..."
    npm run test:watch -- --testPathPattern="(src/components/common|src/components/auth|src/hooks/form)"
    ;;
  "all")
    echo "🚀 Ejecutando todos los tests de componentes principales..."
    npm test -- --testPathPattern="(src/components/common|src/components/auth|src/hooks/form)" --verbose
    ;;
  *)
    echo "Uso: $0 {common|auth|hooks|coverage|watch|all}"
    echo ""
    echo "Opciones disponibles:"
    echo "  common    - Tests de componentes comunes (Button, Input, etc.)"
    echo "  auth      - Tests de componentes de autenticación"
    echo "  hooks     - Tests de hooks de formularios"
    echo "  coverage  - Tests con reporte de cobertura"
    echo "  watch     - Tests en modo watch (desarrollo)"
    echo "  all       - Todos los tests de componentes principales"
    exit 1
    ;;
esac

echo "✅ Tests completados!" 