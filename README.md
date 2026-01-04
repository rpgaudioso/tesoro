# Tesoro - Sistema de Finanças Pessoais/Família

MVP de um sistema B2C de finanças pessoais e familiares, inspirado no MDO (Meu Dinheiro Organizado).

## 🚀 Tecnologias

### Backend
- **NestJS** + TypeScript
- **PostgreSQL** (via Prisma ORM)
- **JWT** para autenticação
- **Docker** para infraestrutura local

### Frontend
- **Vite** + **React** + TypeScript
- **TanStack Query** para gerenciamento de estado
- **React Router** para navegação
- **Design System** custom com tokens e componentes reutilizáveis

### Shared
- **Zod** para validação de schemas
- Tipos TypeScript compartilhados

## 📋 Funcionalidades

- ✅ Autenticação (Register/Login)
- ✅ Multi-tenant (Workspaces)
- ✅ Pessoas e Categorias
- ✅ Contas e Cartões de Crédito
- ✅ Lançamentos (Receitas/Despesas)
- ✅ Parcelamentos automáticos
- ✅ Orçamentos mensais com alertas
- ✅ Dashboard com visão geral e progresso
- ✅ Impacto de parcelas futuras
- 🚧 Importação de CSV (estrutura criada)

## 🛠️ Setup e Instalação

### Pré-requisitos

- Node.js >= 18
- pnpm >= 8
- Docker e Docker Compose

### 1. Instalar dependências

```bash
# Na raiz do projeto
pnpm install
```

### 2. Iniciar banco de dados

```bash
# Subir PostgreSQL e Redis
docker-compose up -d

# Verificar se está rodando
docker-compose ps
```

### 3. Configurar Backend

```bash
cd apps/backend

# O arquivo .env já está configurado
# Gerar o Prisma Client
pnpm db:generate

# Rodar migrations
pnpm db:migrate

# Popular banco com dados iniciais
pnpm db:seed
```

### 4. Iniciar aplicação

```bash
# Na raiz do projeto, rodar frontend e backend simultaneamente
pnpm dev

# OU rodar separadamente:
pnpm dev:backend  # Backend em http://localhost:3000
pnpm dev:frontend # Frontend em http://localhost:5173
```

## 🔐 Credenciais de Acesso (após seed)

- **Email**: `demo@tesoro.com`
- **Senha**: `password123`
- **Workspace ID**: `00000000-0000-0000-0000-000000000001`

## 📁 Estrutura do Projeto

```
tesoro/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── prisma/       # Schema e migrations
│   │   ├── src/
│   │   │   ├── auth/     # Autenticação JWT
│   │   │   ├── workspaces/
│   │   │   ├── people/
│   │   │   ├── categories/
│   │   │   ├── accounts/
│   │   │   ├── cards/
│   │   │   ├── budgets/
│   │   │   ├── transactions/
│   │   │   ├── dashboard/
│   │   │   └── imports/
│   │   └── package.json
│   │
│   └── frontend/         # React + Vite
│       ├── src/
│       │   ├── components/
│       │   │   ├── UI/   # Design System
│       │   │   └── Layout/
│       │   ├── contexts/ # Auth context
│       │   ├── pages/    # Páginas da aplicação
│       │   ├── lib/      # API client
│       │   └── main.tsx
│       └── package.json
│
├── packages/
│   └── shared/           # Tipos e schemas compartilhados
│       ├── src/
│       │   ├── types.ts
│       │   ├── schemas.ts (Zod)
│       │   └── enums.ts
│       └── package.json
│
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json
```

## 🎨 Design System

### Tokens

**Spacing**: 4, 8, 12, 16, 24, 32, 48, 64px  
**Radius**: 8, 12, 16, full  
**Font Sizes**: xs(12), sm(14), base(16), lg(20), xl(24), 2xl(32)

**Colors**:
- Primary: azul (#3b82f6)
- Success: verde (#10b981)
- Warning: laranja (#f59e0b)
- Danger: vermelho (#ef4444)
- Neutral: escala de cinzas

### Componentes

- `Button` - com variants (primary, secondary, danger, ghost)
- `Card` - container base
- `Input` - input com label e erro
- `ProgressBar` - barra de progresso com cores automáticas
- `Alert` - alertas coloridos
- `Badge` - etiquetas pequenas

## 🗄️ Modelo de Dados

### Principais Entidades

- **User**: usuário do sistema
- **Workspace**: espaço de trabalho (família/casal/solo)
- **Member**: relação User ↔ Workspace com role (OWNER/EDITOR/VIEWER)
- **Person**: quem gasta (pode ser != de User)
- **Category**: categorias de despesas
- **Account**: contas bancárias/dinheiro
- **Card**: cartões de crédito
- **Transaction**: lançamentos (receitas/despesas)
- **Budget**: orçamento mensal por categoria
- **InstallmentPlan** + **Installment**: parcelamentos

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Login

### Workspaces
- `GET /api/workspaces` - Listar workspaces do usuário
- `POST /api/workspaces` - Criar novo workspace
- `GET /api/workspaces/:id` - Detalhes

### Recursos (People, Categories, Accounts, Cards)
- `GET /api/{resource}` - Listar
- `POST /api/{resource}` - Criar
- `GET /api/{resource}/:id` - Detalhes
- `PATCH /api/{resource}/:id` - Atualizar
- `DELETE /api/{resource}/:id` - Remover

### Transactions
- `GET /api/transactions?month=YYYY-MM` - Listar (com filtros)
- `POST /api/transactions` - Criar
- `PUT /api/transactions/:id` - Atualizar
- `DELETE /api/transactions/:id` - Remover

### Budgets
- `GET /api/budgets/:month` - Orçamentos do mês (com spent calculado)
- `PUT /api/budgets/:month` - Atualizar orçamentos (upsert)

### Cards
- `GET /api/cards/:id/statement?month=YYYY-MM` - Fatura
- `POST /api/cards/:id/purchases` - Criar compra (com parcelamento)

### Dashboard
- `GET /api/dashboard?month=YYYY-MM` - Visão geral do mês

## 🔒 Autenticação e Multi-tenant

Todas as requests (exceto auth) requerem:

**Headers**:
```
Authorization: Bearer <token>
x-workspace-id: <workspace-id>
```

O `WorkspaceGuard` valida que o usuário tem acesso ao workspace informado.

## 📊 Regras de Negócio

### Transações
- Valor sempre positivo, use `type` para diferenciar INCOME/EXPENSE
- Deve ter `accountId` OU `cardId` (um dos dois obrigatório)

### Orçamento
- Budget único por `categoryId + month`
- Spent calculado em runtime (soma das despesas do mês)
- Alertas: >=80% warning, >100% danger

### Parcelamento
- Compra parcelada cria 1 `InstallmentPlan` + N `Installment`
- Cada parcela gera uma `Transaction` no mês correto
- Aparecem no `cardImpact` do Dashboard

### Cartões
- Fatura simplificada: agrupa por `month` da transaction
- Futuramente: implementar `closingDay`/`dueDay`

## 🚀 Próximos Passos

1. **Importação CSV** - Implementar upload, parse e preview
2. **Edição de transações** - Modal/form para editar
3. **Gestão de orçamentos** - UI para atualizar limites
4. **Relatórios** - Gráficos com Recharts
5. **Mobile responsive** - Adaptar para mobile
6. **Testes** - Unit e E2E
7. **Deploy** - CI/CD e hosting

## 📝 Scripts Úteis

```bash
# Desenvolvimento
pnpm dev              # Roda tudo
pnpm dev:backend      # Só backend
pnpm dev:frontend     # Só frontend

# Banco de dados
pnpm db:migrate       # Roda migrations
pnpm db:seed          # Popula dados iniciais
pnpm db:studio        # Prisma Studio (GUI)

# Build
pnpm build            # Build de tudo

# Lint
pnpm lint             # Lint em todos os pacotes
```

## 🐳 Docker

```bash
# Subir serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Resetar volumes (⚠️ apaga dados)
docker-compose down -v
```

## 📖 Referências

- Produto inspirado em: https://www.pedrogridio.com
- Stack: NestJS, React, Prisma, PostgreSQL
- Design: Sistema próprio com tokens CSS

## 👨‍💻 Desenvolvimento

Este é um MVP. O código está organizado de forma extensível para adicionar:
- Novos módulos no backend
- Novas páginas no frontend
- Novos componentes no design system
- Novos tipos/schemas no shared

Evitamos overengineering - implementamos o essencial de forma limpa e escalável.

---

**Dúvidas?** Verifique o código ou abra uma issue! 🚀
