# Welcome Tour - Tour de Boas-Vindas

## Visão Geral

O tour de boas-vindas é um fluxo de onboarding para novos usuários que guia o processo de configuração inicial do Tesoro. Ele direciona o usuário a criar sua primeira workspace, pessoa e conta de forma intuitiva e visual.

## Quando é Exibido

O tour é automaticamente exibido quando:
- Um novo usuário se registra pela primeira vez
- Um usuário existente reseta seus dados sem usar a opção "auto seed"
- O usuário não possui nenhuma workspace no sistema

## Fluxo do Tour

### 1. Tela de Boas-Vindas (Welcome)
- Apresentação do Tesoro
- Destaque das principais funcionalidades:
  - Gestão de finanças pessoais
  - Controle de múltiplas workspaces
  - Importação automática de extratos
  - Visualização de dashboards e relatórios

### 2. Criar Workspace
- Campo de entrada para nome da workspace
- Sugestão padrão: "Minha Workspace"
- Explicação sobre o que é uma workspace

### 3. Adicionar Pessoa
- Campo de entrada para nome da pessoa
- Seleção automática de cor aleatória para identificação visual
- Explicação sobre o uso de pessoas no sistema

### 4. Configurar Conta
- Campo de entrada para nome da conta
- Seleção de tipo de conta:
  - Conta Corrente (CHECKING)
  - Poupança (SAVINGS)
  - Investimentos (INVESTMENT)
  - Dinheiro (CASH)
  - Outro (OTHER)

### 5. Conclusão
- Checklist de itens criados
- Próximos passos sugeridos:
  - Criar categorias de gastos
  - Importar extratos bancários
  - Configurar orçamentos mensais
- Botão para ir ao dashboard

## Indicador de Progresso

Cada etapa é representada visualmente no topo do tour com:
- Ícone específico (Building, User, CreditCard)
- Label descritivo
- Estados visuais:
  - ✓ Completo (verde)
  - Atual (azul com destaque)
  - Pendente (cinza)

## Integração com Sistema de Reset

O tour está integrado com o sistema de RESET:
- **RESET com Auto Seed**: Cria dados automaticamente e vai direto ao dashboard
- **RESET sem Auto Seed**: Redireciona para o tour de boas-vindas

## Arquivos Relacionados

### Frontend
- `/apps/frontend/src/components/Onboarding/WelcomeTour.tsx` - Componente principal
- `/apps/frontend/src/components/Onboarding/WelcomeTour.module.css` - Estilos
- `/apps/frontend/src/App.tsx` - Rota `/app/welcome`
- `/apps/frontend/src/components/Layout/AppLayout.tsx` - Detecção de usuário sem workspace
- `/apps/frontend/src/components/Layout/ResetDataModal.tsx` - Integração com reset

### Backend
- `/apps/backend/src/auth/auth.service.ts` - Método `resetUserData`
- `/apps/backend/src/auth/auth.controller.ts` - Endpoint `/api/auth/reset-user-data`

## Fluxo Técnico

```
Usuário registra → Login → AuthContext carrega workspaces
                                      ↓
                          workspaces.length === 0?
                                      ↓
                                    Sim → Redireciona para /app/welcome
                                      ↓
                          WelcomeTour renderiza
                                      ↓
                    1. Cria Workspace (POST /api/workspaces)
                                      ↓
                    2. Atualiza contexto (refreshWorkspaces)
                                      ↓
                    3. Seleciona workspace (selectWorkspace)
                                      ↓
                    4. Cria Pessoa (POST /api/people)
                                      ↓
                    5. Cria Conta (POST /api/accounts)
                                      ↓
                    6. Redireciona para dashboard (/app/dashboard)
```

## Validações

- Nome da workspace: obrigatório
- Nome da pessoa: obrigatório
- Nome da conta: obrigatório
- Tipo da conta: obrigatório (com opção padrão)

## Estados de Carregamento

Cada mutação exibe:
- Estado de loading no botão
- Toast de sucesso ao completar
- Toast de erro em caso de falha
- Desabilita formulário durante processamento

## Características UX

1. **Auto-focus**: Campos de entrada recebem foco automaticamente
2. **Feedback visual**: Progresso claro com ícones e cores
3. **Mensagens amigáveis**: Textos explicativos em cada etapa
4. **Design responsivo**: Adaptável a diferentes tamanhos de tela
5. **Gradient atraente**: Design moderno com gradiente roxo
6. **Ícones intuitivos**: Representação visual clara de cada etapa

## Tecnologias Utilizadas

- React 18
- TypeScript
- React Router (navegação)
- TanStack Query (mutations)
- Lucide React (ícones)
- Sonner (toasts)
- CSS Modules (estilos isolados)

## Como Testar

1. **Novo usuário**:
   - Registre uma nova conta em `/register`
   - Após login, será redirecionado automaticamente para o tour

2. **Reset sem auto seed**:
   - Faça login com usuário existente
   - Clique em "RESET" no menu lateral
   - NÃO marque a opção "auto seed"
   - Digite "RESETAR" e confirme
   - Será redirecionado para o tour

3. **Reset com auto seed**:
   - Siga os mesmos passos acima
   - MARQUE a opção "auto seed"
   - Será redirecionado direto ao dashboard com dados criados

## Melhorias Futuras

- [ ] Adicionar animações de transição entre etapas
- [ ] Permitir voltar para etapas anteriores
- [ ] Opção de "pular tour" para usuários avançados
- [ ] Tutorial interativo no dashboard após conclusão
- [ ] Salvar progresso do tour no localStorage
- [ ] Integração com sistema de ajuda/tooltips
- [ ] Suporte a temas (dark mode)
- [ ] Personalização de avatar para pessoas
- [ ] Sugestões de categorias populares na conclusão
