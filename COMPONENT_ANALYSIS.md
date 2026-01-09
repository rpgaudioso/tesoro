# Análise de Componentes - Carbon Design System vs Tesoro

## ✅ Componentes que já temos implementados (18)

1. **Alert** - Mensagens de feedback inline ✓
2. **Badge** - Indicador visual compacto ✓
3. **Button** - Botão com variantes ✓
4. **Card** - Container com elevação ✓
5. **Checkbox** - Checkbox estilizado ✓
6. **CodeBlock** - Bloco de código com syntax highlighting ✓
7. **ConfirmDialog** - Dialog de confirmação ✓
8. **EmptyState** - Estado vazio de listas ✓
9. **FormGroup** - Wrapper para forms ✓
10. **IconButton** - Botão circular para ícones ✓
11. **Input** - Campo de texto ✓
12. **Modal** - Dialog modal ✓
13. **PageHeader** - Cabeçalho de página ✓
14. **Portal** - Renderização fora da hierarquia ✓
15. **ProgressBar** - Barra de progresso ✓
16. **Select** - Dropdown de seleção ✓
17. **Textarea** - Campo de texto multi-linha ✓
18. **Toast** - Notificações temporárias ✓

---

## ⚠️ Componentes do Carbon que NÃO temos (prioridades sugeridas)

### 🔴 Prioridade ALTA (úteis para nosso contexto financeiro)

1. **Accordion** - Expandir/colapsar seções de conteúdo
   - Uso: FAQ, detalhes de transações, configurações avançadas
   - Complexidade: Média

2. **Breadcrumb** - Navegação hierárquica
   - Uso: Navegação entre categorias, sub-categorias
   - Complexidade: Baixa

3. **Data Table** - Tabela com ordenação, paginação, busca
   - Uso: Lista de transações, relatórios, extratos
   - Complexidade: Alta
   - **CRÍTICO para nosso sistema**

4. **Date Picker** - Seletor de data
   - Uso: Filtros de período, criação de transações
   - Complexidade: Alta
   - **MUITO ÚTIL para sistema financeiro**

5. **Dropdown/Menu** - Menu dropdown avançado
   - Uso: Ações em massa, filtros avançados
   - Complexidade: Média

6. **Loading/Spinner** - Indicador de carregamento
   - Uso: Feedback durante requisições
   - Complexidade: Baixa

7. **Pagination** - Navegação entre páginas
   - Uso: Listas grandes de transações
   - Complexidade: Baixa

8. **Tabs** - Navegação por abas
   - Uso: Diferentes visualizações (transações, gráficos, relatórios)
   - Complexidade: Média

9. **Tag** - Labels/chips removíveis
   - Uso: Filtros ativos, categorias múltiplas
   - Complexidade: Baixa

10. **Toggle/Switch** - Botão liga/desliga
    - Uso: Ativar/desativar recorrências, notificações
    - Complexidade: Baixa

11. **Tooltip** - Dica contextual no hover
    - Uso: Explicações de campos, ícones
    - Complexidade: Baixa

### 🟡 Prioridade MÉDIA (melhorias de UX)

12. **Content Switcher** - Alternador entre opções
    - Uso: Alternar visualizações (lista/grid, gráfico/tabela)
    - Complexidade: Baixa

13. **File Uploader** - Upload de arquivos
    - Uso: Import de extratos (já temos básico, pode melhorar)
    - Complexidade: Média

14. **Inline Loading** - Loading inline em ações
    - Uso: Feedback em botões de ação
    - Complexidade: Baixa

15. **Link** - Link estilizado
    - Uso: Navegação consistente
    - Complexidade: Baixa

16. **Notification** - Notificação persistente
    - Uso: Avisos importantes, erros de sistema
    - Complexidade: Média
    - Obs: Já temos Toast, este seria mais persistente

17. **Number Input** - Input numérico com incremento/decremento
    - Uso: Valores monetários, parcelas
    - Complexidade: Baixa

18. **Popover** - Conteúdo flutuante
    - Uso: Detalhes rápidos, mini-formulários
    - Complexidade: Média

19. **Progress Indicator** - Wizard/stepper
    - Uso: Onboarding, processos multi-etapa
    - Complexidade: Média

20. **Radio Button** - Seleção única entre opções
    - Uso: Escolha de método de pagamento, tipo de transação
    - Complexidade: Baixa

21. **Search** - Campo de busca avançado
    - Uso: Busca de transações, categorias
    - Complexidade: Média

22. **Slider** - Seletor de range
    - Uso: Filtros de valor (min/max), orçamentos
    - Complexidade: Média

### 🟢 Prioridade BAIXA (nice-to-have)

23. **AI Label** - Label para features de IA
    - Uso: Features futuras com IA
    - Complexidade: Baixa

24. **Contained List** - Lista com bordas e divisores
    - Uso: Listas simples
    - Complexidade: Baixa

25. **List** - Lista estilizada básica
    - Uso: Pode usar elementos HTML nativos
    - Complexidade: Baixa

26. **Menu Buttons** - Botões de menu especializados
    - Uso: Navigation específica
    - Complexidade: Média

27. **Structured List** - Lista com estrutura complexa
    - Uso: Comparações, especificações
    - Complexidade: Média

28. **Tile** - Card interativo
    - Uso: Seleção de opções
    - Complexidade: Baixa

29. **Toggletip** - Tooltip interativo
    - Uso: Dicas com ações
    - Complexidade: Média

30. **Tree View** - Visualização hierárquica
    - Uso: Categorias aninhadas (se implementarmos)
    - Complexidade: Alta

31. **UI Shell** - Shell da aplicação
    - Uso: Já temos AppLayout customizado
    - Complexidade: Alta

---

## 📋 Recomendação de Roadmap

### Fase 1 - Fundamentais (1-2 semanas)
1. **Data Table** - Crítico para listas de transações
2. **Date Picker** - Essencial para filtros e inputs
3. **Loading/Spinner** - Feedback de carregamento
4. **Tooltip** - UX básica
5. **Toggle/Switch** - Comum em configurações

### Fase 2 - Navegação e Organização (1 semana)
6. **Tabs** - Organização de conteúdo
7. **Pagination** - Grandes listas
8. **Breadcrumb** - Navegação hierárquica
9. **Tag** - Filtros e labels

### Fase 3 - Inputs Avançados (1 semana)
10. **Number Input** - Valores monetários
11. **Radio Button** - Seleções únicas
12. **Slider** - Filtros de range

### Fase 4 - Componentes Avançados (1-2 semanas)
13. **Accordion** - Expansão de conteúdo
14. **Dropdown/Menu** - Menus complexos
15. **Search** - Busca avançada
16. **Popover** - Conteúdo flutuante

### Fase 5 - Melhorias de UX (conforme necessário)
17. Restante dos componentes conforme demanda

---

## 🎯 Componentes Específicos para Sistema Financeiro (novos)

Além dos componentes do Carbon, podemos criar componentes específicos:

1. **TransactionCard** - Card especializado para transações
2. **CategoryIcon** - Ícone de categoria estilizado
3. **CurrencyInput** - Input com máscara de moeda
4. **DateRangePicker** - Seletor de período (extensão do DatePicker)
5. **StatCard** - Card de estatística (já temos similar no Dashboard)
6. **ChartCard** - Card com gráfico integrado
7. **BudgetProgressBar** - ProgressBar com indicação de orçamento
8. **RecurringBadge** - Badge especializado para recorrências
9. **CategorySelector** - Seletor de categoria com ícones

---

## 📊 Estatísticas

- **Total de componentes no Carbon**: ~35
- **Já implementados no Tesoro**: 18 (51%)
- **Faltam implementar**: 
  - Alta prioridade: 11 componentes
  - Média prioridade: 10 componentes
  - Baixa prioridade: 9 componentes

---

## 💡 Próximos Passos

1. ✅ Criar estrutura de páginas individuais (feito)
2. ✅ Página de overview com grid de componentes (feito)
3. ✅ Página de exemplo (Button) com tabs Usage/Code/Style (feito)
4. 🔄 Implementar Data Table (próximo componente prioritário)
5. 🔄 Implementar Date Picker
6. 🔄 Continuar implementando componentes conforme roadmap
