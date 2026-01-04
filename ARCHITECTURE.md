# Arquitetura do Sistema Tesoro

## 📐 Visão Geral

O Tesoro é um sistema de finanças pessoais/família construído com arquitetura monorepo, separando frontend, backend e código compartilhado.

```
┌─────────────────────────────────────────────────────────────┐
│                        Cliente (Browser)                     │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Frontend (React + Vite)                      │ │
│  │  - Componentes UI (Design System)                      │ │
│  │  - TanStack Query (cache + sync)                       │ │
│  │  - React Router (navegação)                            │ │
│  │  - Context API (auth global)                           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (NestJS)                          │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Controllers                          │ │
│  │  (validação, auth, transformação de DTOs)              │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                     Services                            │ │
│  │  (lógica de negócio, cálculos, orquestração)           │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Prisma Client                          │ │
│  │  (ORM, queries otimizadas, migrations)                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL                                │
│  (dados relacionais, transações ACID)                       │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Estrutura de Camadas

### Frontend (apps/frontend)

```
src/
├── components/
│   ├── UI/              # Design System (Button, Card, Input, etc.)
│   └── Layout/          # AppLayout (sidebar + main)
├── contexts/
│   └── AuthContext.tsx  # Estado global de autenticação
├── pages/               # Páginas da aplicação
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TransactionsPage.tsx
│   └── ...
├── lib/
│   └── api.ts           # Axios configurado (interceptors)
├── App.tsx              # Router e PrivateRoute
└── main.tsx             # Entry point + providers
```

**Padrões**:
- Componentes funcionais com hooks
- React Query para server state
- CSS Modules para estilos isolados
- Design System com tokens CSS

### Backend (apps/backend)

```
src/
├── auth/                # Autenticação JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── guards/          # JwtAuthGuard, WorkspaceGuard
│   └── strategies/      # JwtStrategy
├── {resource}/          # Módulos de recursos
│   ├── {resource}.module.ts
│   ├── {resource}.controller.ts
│   └── {resource}.service.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

**Padrões**:
- Módulos NestJS (dependency injection)
- Controllers (rotas + validação)
- Services (lógica de negócio)
- Guards (proteção de rotas)
- Prisma para acesso a dados

### Shared (packages/shared)

```
src/
├── types.ts       # Interfaces TypeScript
├── schemas.ts     # Zod schemas (validação)
├── enums.ts       # Enums compartilhados
└── index.ts       # Exports públicos
```

**Uso**:
- Backend: validação de DTOs
- Frontend: types para TypeScript
- Sincronização de contratos

## 🔐 Fluxo de Autenticação

```
1. User → POST /auth/login {email, password}
2. Backend valida credenciais
3. Backend gera JWT token
4. Frontend armazena token + workspaceId no localStorage
5. Todas as requests subsequentes incluem:
   - Header: Authorization: Bearer <token>
   - Header: x-workspace-id: <workspace-id>
6. JwtAuthGuard valida token
7. WorkspaceGuard valida acesso ao workspace
8. Request processado
```

### Guards

**JwtAuthGuard**:
- Valida JWT token
- Decodifica userId
- Busca user + members no banco
- Injeta `user` no request

**WorkspaceGuard**:
- Lê `x-workspace-id` do header
- Verifica se user tem acesso
- Injeta `workspaceId` no request

## 💾 Modelo de Dados

### Multi-tenancy

Todas as entidades principais têm `workspaceId`:

```
User 1───N Member N───1 Workspace
                            │
                            │ (workspaceId em todas as entidades)
                            │
            ┌───────────────┼───────────────┐
            │               │               │
         Person        Category         Account
            │               │               │
            └───────────Transaction────────┘
                            │
                    ┌───────┼───────┐
                  Card   Budget   Installment
```

### Relacionamentos Principais

**Transaction**:
- Pertence a 1 Workspace
- Pertence a 1 Category
- Pertence a 1 Account OU 1 Card (exclusivo)
- Pode ter 1 Person (opcional)
- Pode ter 1 Installment (se for parcela)

**Budget**:
- Unique index: `(workspaceId, categoryId, month)`
- Spent calculado em runtime (não armazenado)

**InstallmentPlan + Installment**:
- Plan cria N Installments
- Cada Installment gera 1 Transaction
- Usado para compras parceladas

## 🔄 Fluxo de Dados

### Dashboard

```
1. Frontend: GET /api/dashboard?month=2026-01
2. Backend DashboardService:
   a. Busca transactions do mês
   b. Calcula income/expenses/balance
   c. Busca budgets do mês
   d. Para cada budget, calcula spent (sum transactions)
   e. Gera alertas (>= 80% ou 100%)
   f. Calcula cardImpact (installments futuros)
3. Retorna DashboardData
4. Frontend renderiza com React Query cache
```

### Criar Transação

```
1. Frontend: POST /api/transactions
2. Backend valida DTO (Zod schema)
3. WorkspaceGuard valida acesso
4. TransactionsService.create()
5. Prisma.transaction.create()
6. Retorna transaction com includes (category, account, etc.)
7. Frontend invalida cache do React Query
8. UI atualiza automaticamente
```

### Compra Parcelada

```
1. Frontend: POST /api/cards/:id/purchases {installments: 12}
2. Backend CardsService.createPurchase()
3. Prisma $transaction:
   a. Cria InstallmentPlan
   b. Loop 12x:
      - Cria Transaction (mês + i)
      - Cria Installment linkado
4. Commit transaction
5. Frontend invalida cache
6. Dashboard mostra cardImpact atualizado
```

## 🎨 Design System

### Tokens CSS (CSS Variables)

```css
--spacing-*    /* 4, 8, 12, 16, 24, 32, 48, 64 */
--radius-*     /* 8, 12, 16, full */
--font-*       /* xs, sm, base, lg, xl, 2xl */
--color-*      /* primary, success, warning, danger, neutral-* */
```

### Componentes Base

Todos os componentes seguem o padrão:

```tsx
interface ComponentProps {
  variant?: 'primary' | 'secondary' | ...;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}
```

- Props tipadas
- Variants para diferentes estados
- className para extensão
- CSS Modules para isolamento

## 🚀 Performance

### Frontend

- **Code Splitting**: React.lazy() para páginas
- **React Query**: cache automático, deduplicação
- **CSS Modules**: estilos otimizados no build
- **Vite**: HMR rápido, build otimizado

### Backend

- **Prisma**: queries otimizadas, prepared statements
- **Includes seletivos**: buscar só o necessário
- **Indexes**: em workspaceId, date, categoryId
- **Connection pooling**: Prisma gerencia pool

### Database

- **Indexes**: em campos filtrados/joins
- **Foreign Keys**: integridade referencial
- **Cascade deletes**: limpeza automática
- **Unique constraints**: previne duplicatas

## 🧪 Testabilidade

### Backend

Estrutura facilita testes:
```typescript
// Mock do PrismaService
const mockPrisma = {
  transaction: {
    findMany: jest.fn(),
    create: jest.fn(),
  }
}

// Service testável
const service = new TransactionsService(mockPrisma);
```

### Frontend

Componentes isolados:
```tsx
// Testar Button isoladamente
render(<Button variant="primary">Click</Button>);

// Testar com Query Provider
const wrapper = ({ children }) => (
  <QueryClientProvider client={testQueryClient}>
    {children}
  </QueryClientProvider>
);
```

## 🔧 Extensibilidade

### Adicionar novo recurso

**Backend**:
1. `nest g module nome`
2. `nest g service nome`
3. `nest g controller nome`
4. Adicionar Prisma model
5. Migrar banco

**Frontend**:
1. Criar página em `pages/`
2. Criar componente se necessário
3. Adicionar rota em `App.tsx`
4. Usar React Query para dados

### Adicionar campo no modelo

1. Atualizar `schema.prisma`
2. `pnpm db:migrate`
3. Atualizar types em `shared/`
4. Atualizar DTO schemas (Zod)
5. Atualizar UI conforme necessário

## 📦 Build e Deploy

### Desenvolvimento
```bash
pnpm dev  # Roda tudo com HMR
```

### Produção
```bash
pnpm build            # Build frontend + backend
pnpm db:migrate:deploy # Migrations em prod
pnpm start            # Inicia aplicação
```

### Docker
```bash
docker-compose up -d  # Só infra (dev)
# OU
docker build ...      # Build da aplicação (prod)
```

---

Esta arquitetura foi desenhada para ser:
- ✅ **Escalável**: adicionar features é direto
- ✅ **Manutenível**: código organizado e tipado
- ✅ **Performática**: otimizações em todas as camadas
- ✅ **Testável**: dependencies injetadas, componentes isolados
- ✅ **Segura**: multi-tenant, auth em todas as rotas
