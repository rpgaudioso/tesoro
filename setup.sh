#!/bin/bash

# Script de setup completo do Tesoro

echo "🚀 Iniciando setup do Tesoro..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm não encontrado. Por favor, instale: npm install -g pnpm"
    exit 1
fi

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker."
    exit 1
fi

# Install dependencies
echo "📦 Instalando dependências..."
pnpm install

# Compile bcrypt manually (pnpm ignores build scripts)
echo "🔨 Compilando bcrypt..."
cd node_modules/.pnpm/bcrypt@5.1.1/node_modules/bcrypt && npm run install > /dev/null 2>&1
cd ../../../../..

# Start Docker services
echo "🐳 Iniciando serviços Docker..."
docker compose up -d

# Wait for postgres to be ready
echo "⏳ Aguardando PostgreSQL..."
sleep 5

# Setup backend
echo "⚙️  Configurando backend..."
cd apps/backend

# Build shared package first
echo "   - Compilando pacote shared..."
cd ../../packages/shared && pnpm build
cd ../../apps/backend

# Generate Prisma Client
echo "   - Gerando Prisma Client..."
pnpm db:generate

# Run migrations
echo "   - Rodando migrations..."
pnpm db:migrate

# Seed database
echo "   - Populando banco de dados..."
pnpm db:seed

cd ../..

echo ""
echo "✅ Setup concluído com sucesso!"
echo ""
echo "📝 Credenciais de acesso:"
echo "   Email: demo@tesoro.com"
echo "   Senha: password123"
echo ""
echo "🎯 Para iniciar a aplicação, execute:"
echo "   pnpm dev"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
echo ""
