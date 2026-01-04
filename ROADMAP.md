# Roadmap - Próximas Implementações

## 🎯 Alta Prioridade

### 1. Formulário de Transações
- [ ] Modal/página para criar nova transação
- [ ] Seleção de tipo (Receita/Despesa)
- [ ] Escolha entre Conta ou Cartão
- [ ] Suporte a parcelamento (quando for cartão)
- [ ] Validação com Zod + react-hook-form

### 2. Edição de Transações
- [ ] Modal de edição
- [ ] Botão de exclusão com confirmação
- [ ] Atualização em tempo real (React Query)

### 3. Gestão de Orçamentos
- [ ] Interface para definir/editar limites por categoria
- [ ] Copiar orçamento do mês anterior
- [ ] Visualização de histórico de orçamentos

### 4. Importação CSV
- [ ] Upload de arquivo
- [ ] Parser CSV com validação
- [ ] Preview com sugestão de categoria/pessoa
- [ ] Resolver pendências antes de confirmar
- [ ] Template CSV de exemplo

## 📊 Melhorias de UI/UX

### Dashboard
- [ ] Gráfico de pizza (gastos por categoria)
- [ ] Gráfico de linha (evolução mensal)
- [ ] Comparação com meses anteriores
- [ ] Metas financeiras

### Transações
- [ ] Filtros avançados (categoria, pessoa, tipo)
- [ ] Busca por descrição
- [ ] Paginação
- [ ] Export para CSV/PDF

### Cards
- [ ] Página de detalhes do cartão
- [ ] Histórico de faturas
- [ ] Visualização de parcelas pendentes
- [ ] Alertas de vencimento

## 🔧 Funcionalidades Novas

### 1. Contas Bancárias
- [ ] Dashboard de contas
- [ ] Saldo atual calculado
- [ ] Transferências entre contas
- [ ] Conciliação bancária

### 2. Metas Financeiras
- [ ] Criar meta (valor + prazo)
- [ ] Progresso visual
- [ ] Sugestões de quanto guardar por mês
- [ ] Histórico de metas atingidas

### 3. Recorrência
- [ ] Transações recorrentes (mensal/semanal)
- [ ] Sugestão automática no início do mês
- [ ] Gerenciamento de recorrências

### 4. Notificações
- [ ] Alertas de orçamento estourado
- [ ] Lembrete de vencimento de fatura
- [ ] Resumo semanal/mensal por email

### 5. Relatórios
- [ ] Relatório mensal completo
- [ ] Comparativo entre meses
- [ ] Análise de tendências
- [ ] Export para PDF

## 📱 Mobile

### Responsividade
- [ ] Adaptar layout para mobile
- [ ] Menu hambúrguer
- [ ] Cards touch-friendly
- [ ] Gestos (swipe para ações)

### PWA
- [ ] Service Worker
- [ ] Funcionar offline
- [ ] Instalável na home screen
- [ ] Push notifications

## 🔒 Segurança e Performance

### Autenticação
- [ ] Refresh token
- [ ] 2FA (two-factor authentication)
- [ ] Recuperação de senha
- [ ] Sessões ativas

### Performance
- [ ] Cache strategies
- [ ] Lazy loading de imagens
- [ ] Code splitting
- [ ] Otimização de queries (N+1)

### Testes
- [ ] Unit tests (backend)
- [ ] Unit tests (frontend)
- [ ] Integration tests
- [ ] E2E tests (Playwright/Cypress)

## 🚀 DevOps e Deploy

### CI/CD
- [ ] GitHub Actions
- [ ] Testes automáticos
- [ ] Deploy automático
- [ ] Rollback strategy

### Hosting
- [ ] Backend: Railway / Render / Fly.io
- [ ] Frontend: Vercel / Netlify
- [ ] Database: Supabase / Neon
- [ ] Storage: S3 / Cloudinary (para uploads)

### Monitoramento
- [ ] Logging (Winston / Pino)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Posthog / Plausible)
- [ ] Uptime monitoring

## 🎨 Melhorias de Design

### Design System
- [ ] Storybook para componentes
- [ ] Temas (light/dark mode)
- [ ] Mais variantes de componentes
- [ ] Animações e transições

### Acessibilidade
- [ ] ARIA labels
- [ ] Navegação por teclado
- [ ] Screen reader support
- [ ] Contraste de cores (WCAG)

## 📚 Documentação

- [ ] API documentation (Swagger)
- [ ] Component documentation (Storybook)
- [ ] Guia de contribuição
- [ ] Tutoriais e exemplos

## 🌐 Internacionalização

- [ ] i18n setup
- [ ] Tradução PT/EN/ES
- [ ] Formatação de moedas
- [ ] Formatação de datas

---

## 💡 Ideias Futuras

- Integração com Open Banking
- OCR para notas fiscais
- IA para sugestões de economia
- Compartilhamento de orçamento entre membros
- Gamificação (badges, conquistas)
- Integração com bancos via API
- Análise preditiva de gastos
- Calculadora de investimentos
