# Guia Rápido - Primeiros Passos

## 1. Setup Inicial (5 minutos)

```bash
# 1. Instalar dependências
pnpm install

# 2. Subir banco de dados
docker-compose up -d

# 3. Configurar backend
cd apps/backend
pnpm db:generate
pnpm db:migrate
pnpm db:seed
cd ../..

# 4. Iniciar aplicação
pnpm dev
```

## 2. Acessar a Aplicação

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **Prisma Studio**: `pnpm db:studio` (GUI do banco)

## 3. Login

Após rodar o seed, use:
- Email: `demo@tesoro.com`
- Senha: `password123`

## 4. Explorar

### Dashboard
- Visualize receitas, despesas e saldo do mês
- Veja progresso dos orçamentos por categoria
- Alertas quando orçamento está próximo do limite
- Impacto de parcelas futuras

### Lançamentos
- Lista todas as transações do mês
- Filtre por mês usando o seletor
- Veja categoria, data e valor

### Categorias
- Veja todas as categorias pré-cadastradas
- 8 categorias padrão já criadas pelo seed

## 5. Testar API

Abra o arquivo `api-examples.http` no VS Code (com REST Client extension) ou importe no Postman.

Principais endpoints:
- `POST /api/auth/register` - Criar nova conta
- `POST /api/auth/login` - Login
- `GET /api/dashboard?month=2026-01` - Dashboard
- `POST /api/transactions` - Criar lançamento
- `POST /api/cards/:id/purchases` - Compra parcelada

## 6. Desenvolvimento

### Estrutura
```
apps/backend/src/    # Módulos NestJS
apps/frontend/src/   # Componentes React
packages/shared/src/ # Tipos compartilhados
```

### Adicionar nova funcionalidade

**Backend (NestJS)**:
1. Criar módulo: `nest g module nome`
2. Criar service: `nest g service nome`
3. Criar controller: `nest g controller nome`
4. Adicionar ao `app.module.ts`

**Frontend (React)**:
1. Criar componente em `src/components/`
2. Criar página em `src/pages/`
3. Adicionar rota em `App.tsx`

### Design System

Use os componentes prontos:
```tsx
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Input from '@/components/UI/Input';
import ProgressBar from '@/components/UI/ProgressBar';
import Alert from '@/components/UI/Alert';
import Badge from '@/components/UI/Badge';
```

## 7. Comandos Úteis

```bash
# Ver logs do banco
docker-compose logs -f postgres

# Resetar banco (⚠️ apaga dados)
docker-compose down -v
docker-compose up -d
pnpm db:migrate
pnpm db:seed

# Abrir Prisma Studio
pnpm db:studio

# Build para produção
pnpm build
```

## 8. Próximos Passos

Funcionalidades para implementar:
1. **Editar transações** - Modal para editar/excluir
2. **Criar transação** - Formulário no frontend
3. **Gerenciar orçamentos** - UI para atualizar limites
4. **Fatura de cartão** - Página detalhada
5. **Gráficos** - Usar Recharts para visualizações
6. **Importação CSV** - Completar o fluxo

## 9. Troubleshooting

**Erro ao conectar no banco:**
```bash
# Verifique se o Docker está rodando
docker-compose ps

# Recrie o container
docker-compose down
docker-compose up -d
```

**Erro de tipos/imports:**
```bash
# Recrie o Prisma Client
cd apps/backend
pnpm db:generate
```

**Frontend não carrega:**
```bash
# Limpe node_modules e reinstale
rm -rf node_modules
pnpm install
```

---

🎉 **Pronto!** Você tem um sistema de finanças completo rodando localmente.
