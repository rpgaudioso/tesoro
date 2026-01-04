# Comandos Úteis - Tesoro

## 🚀 Início Rápido

```bash
# Setup completo (primeira vez)
./setup.sh

# Ou manualmente:
pnpm install
docker-compose up -d
cd apps/backend && pnpm db:generate && pnpm db:migrate && pnpm db:seed && cd ../..
pnpm dev
```

## 🔧 Desenvolvimento

### Rodar aplicação

```bash
# Tudo junto (frontend + backend)
pnpm dev

# Apenas backend
pnpm dev:backend

# Apenas frontend
pnpm dev:frontend
```

### Build

```bash
# Build de todos os pacotes
pnpm build

# Apenas backend
cd apps/backend && pnpm build

# Apenas frontend
cd apps/frontend && pnpm build
```

## 🗄️ Banco de Dados

### Prisma

```bash
# Gerar Prisma Client (após mudar schema)
cd apps/backend
pnpm db:generate

# Criar migration
pnpm db:migrate

# Aplicar migrations em produção
pnpm db:migrate:deploy

# Abrir Prisma Studio (GUI do banco)
pnpm db:studio

# Popular banco com dados iniciais
pnpm db:seed

# Resetar banco (⚠️ apaga tudo)
pnpm prisma migrate reset
```

### Queries Diretas

```bash
# Conectar no PostgreSQL
docker exec -it tesoro-postgres psql -U tesoro -d tesoro_db

# Queries úteis
\dt                    # Listar tabelas
\d users              # Descrever tabela
SELECT * FROM users;  # Consultar
\q                    # Sair
```

## 🐳 Docker

### Gerenciar containers

```bash
# Subir serviços
docker-compose up -d

# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f
docker-compose logs -f postgres  # Só postgres

# Parar serviços
docker-compose stop

# Parar e remover
docker-compose down

# Resetar volumes (⚠️ apaga dados)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

### Comandos úteis

```bash
# Acessar container
docker exec -it tesoro-postgres bash

# Ver uso de espaço
docker system df

# Limpar tudo não usado
docker system prune -a
```

## 📦 Dependências

### Instalar/Atualizar

```bash
# Instalar todas as dependências
pnpm install

# Adicionar dependência no workspace root
pnpm add -w <pacote>

# Adicionar no backend
pnpm --filter backend add <pacote>

# Adicionar no frontend
pnpm --filter frontend add <pacote>

# Adicionar no shared
pnpm --filter @tesoro/shared add <pacote>

# Remover dependência
pnpm remove <pacote>

# Atualizar todas
pnpm update
```

### Listar dependências

```bash
# Ver dependências instaladas
pnpm list

# Ver outdated
pnpm outdated

# Ver por workspace
pnpm --filter backend list
```

## 🧹 Limpeza

```bash
# Limpar node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Limpar builds
rm -rf apps/*/dist apps/*/build

# Reinstalar tudo
pnpm install
```

## 🔍 Debug

### Backend

```bash
# Ver logs detalhados
cd apps/backend
pnpm start:debug

# Ou com watch
pnpm start:dev
```

### Frontend

```bash
# Ver bundle size
cd apps/frontend
pnpm build
# Vite mostra análise do bundle

# Preview da build
pnpm preview
```

## 🧪 Testes

```bash
# Rodar todos os testes
pnpm test

# Apenas backend
cd apps/backend
pnpm test

# Com coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

## 🔐 Segurança

```bash
# Auditar vulnerabilidades
pnpm audit

# Fix automático
pnpm audit --fix
```

## 📊 Análise de Código

```bash
# Lint
pnpm lint

# Lint com fix
pnpm lint --fix

# Type check (TypeScript)
cd apps/backend && pnpm typecheck
cd apps/frontend && pnpm build  # Vite faz type check
```

## 🚀 Deploy

### Preparar para produção

```bash
# Build de tudo
pnpm build

# Testar build localmente
cd apps/backend && node dist/main.js
cd apps/frontend && pnpm preview
```

### Variáveis de Ambiente

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env
# Editar .env com valores de produção

# Frontend (em tempo de build)
# Editar apps/frontend/.env
```

## 🔄 Git

```bash
# Status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "feat: descrição"

# Push
git push origin main

# Nova branch
git checkout -b feature/nome
```

## 📝 Logs

```bash
# Backend logs
cd apps/backend
# Logs vão para console em dev

# Docker logs
docker-compose logs -f

# Filtrar por serviço
docker-compose logs -f postgres
docker-compose logs -f redis
```

## 🎯 Tarefas Comuns

### Adicionar nova categoria (via API)

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Authorization: Bearer <token>" \
  -H "x-workspace-id: <workspace-id>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Nova Categoria","icon":"🎯","color":"#10b981"}'
```

### Criar transação

```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Authorization: Bearer <token>" \
  -H "x-workspace-id: <workspace-id>" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-01-15",
    "description": "Compra teste",
    "amount": 100.50,
    "type": "EXPENSE",
    "categoryId": "cat-outros",
    "accountId": "account-main"
  }'
```

### Backup do banco

```bash
# Export
docker exec tesoro-postgres pg_dump -U tesoro tesoro_db > backup.sql

# Import
docker exec -i tesoro-postgres psql -U tesoro -d tesoro_db < backup.sql
```

## 🛠️ Troubleshooting

### Prisma Client desatualizado

```bash
cd apps/backend
rm -rf node_modules/.prisma
pnpm db:generate
```

### Port já em uso

```bash
# Backend (3000)
lsof -ti:3000 | xargs kill -9

# Frontend (5173)
lsof -ti:5173 | xargs kill -9

# Postgres (5432)
docker-compose down
docker-compose up -d
```

### Erro de tipos no frontend

```bash
# Limpar e rebuildar
cd apps/frontend
rm -rf node_modules
pnpm install
```

### Migrations falhando

```bash
cd apps/backend
# Ver status
pnpm prisma migrate status

# Reset (⚠️ apaga dados)
pnpm prisma migrate reset

# Criar nova
pnpm db:migrate
```

---

💡 **Dica**: Adicione este arquivo aos seus favoritos para referência rápida!
