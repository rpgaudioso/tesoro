# Design System Refactoring

## Objetivo

Refatorar o projeto para garantir 100% de uso consistente do design system em todas as páginas, eliminando cores hardcoded, inline styles e componentes duplicados.

## Componentes Criados

### 1. Select
- **Localização**: `apps/frontend/src/components/UI/Select.tsx`
- **Props**: label, error, options, placeholder, fullWidth
- **Uso**: Substituir todos os `<select>` nativos por este componente
- **Padrão**: Segue mesmo estilo do Input com foco states

### 2. FormGroup
- **Localização**: `apps/frontend/src/components/UI/FormGroup.tsx`
- **Props**: label, error, required, children, fullWidth
- **Uso**: Wrapper para label + input/select/textarea + error
- **Benefício**: Padroniza espaçamento e layout de todos os formulários

### 3. Textarea
- **Localização**: `apps/frontend/src/components/UI/Textarea.tsx`
- **Props**: label, error, fullWidth, resize
- **Uso**: Substituir `<textarea>` nativos
- **Padrão**: Mesmos estados de foco que Input

### 4. Checkbox
- **Localização**: `apps/frontend/src/components/UI/Checkbox.tsx`
- **Props**: label, error, checked, onChange
- **Uso**: Checkbox estilizado com design consistente
- **Estilo**: Custom checkmark com cores do design system

### 5. IconButton
- **Localização**: `apps/frontend/src/components/UI/IconButton.tsx`
- **Props**: variant (default, primary, danger, ghost), size (sm, md, lg)
- **Uso**: Botões circulares para ícones (Edit, Delete, etc)
- **Variantes**: 4 variantes com hover states

### 6. EmptyState
- **Localização**: `apps/frontend/src/components/UI/EmptyState.tsx`
- **Props**: icon, title, description, action
- **Uso**: Estado vazio de listas/páginas
- **Padrão**: Ícone + título + descrição + ação opcional

### 7. Toast
- **Localização**: `apps/frontend/src/components/UI/Toast.tsx`
- **Props**: Não usa props diretamente, usa API singleton
- **API**: `toast.success(message)`, `toast.error(message)`, `toast.warning(message)`, `toast.info(message)`
- **Uso**: Notificações temporárias no canto superior direito
- **Substituiu**: Biblioteca Sonner (externa) por implementação própria
- **Provider**: `<ToastProvider />` deve ser renderizado no App.tsx (já configurado)

## Sistema de Tokens CSS

Todos os componentes utilizam exclusivamente as variáveis CSS do design system:

### Spacing
- `--spacing-4` até `--spacing-64` (4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64px)

### Radius
- `--radius-6` até `--radius-full` (6, 8, 12, 16, 20, 24, 9999px)

### Font Sizes
- `--font-xs(12)` até `--font-4xl(36)`

### Font Weights
- `--font-normal(400)` até `--font-bold(700)`

### Colors
- **Primary**: `--color-primary` (#FF5722), `--color-primary-hover`, `--color-primary-light`
- **Feedback**: `--color-success`, `--color-warning`, `--color-danger` + variants light
- **Neutrals**: `--color-neutral-50` até `--color-neutral-900`
- **Text**: `--color-text`, `--color-text-secondary`, `--color-text-tertiary`
- **Background**: `--color-bg`, `--color-bg-secondary`, `--color-bg-tertiary`
- **Border**: `--color-border`, `--color-border-light`

### Shadows
- `--shadow-xs` até `--shadow-xl`

## Exemplo de Refatoração: WorkspaceList

### Antes (Problemas)
```tsx
// ❌ Cores hardcoded
background: #3b82f6;
color: #1f2937;
border-color: #d1d5db;

// ❌ Inline styles
<span style={{ backgroundColor: person.color || '#3B82F6' }} />

// ❌ Elementos nativos sem design system
<button className={styles.btnPrimary}>...</button>
<input className={styles.input} />
<div className={styles.modalOverlay}>...</div>
```

### Depois (Correto)
```tsx
// ✅ Componentes do design system
import { Button, Card, Checkbox, ConfirmDialog, EmptyState, IconButton, Input, Modal } from '@/components/UI';

// ✅ Sem cores hardcoded
<Button onClick={...}>Nova Workspace</Button>
<Input label="Nome" fullWidth />
<IconButton variant="danger"><Trash2 /></IconButton>

// ✅ EmptyState padronizado
<EmptyState 
  icon={<Inbox />} 
  title="Nenhuma workspace encontrada"
  description="Crie sua primeira workspace para começar"
/>

// ✅ Modal do design system
<Modal isOpen={...} onClose={...} title="Editar">
  <form>...</form>
</Modal>
```

### CSS Antes
```css
/* ❌ Hardcoded colors */
.btnPrimary {
  background: #3b82f6;
  color: white;
}

/* ❌ Valores fixos sem tokens */
.form {
  padding: 1.5rem;
  gap: 1rem;
}
```

### CSS Depois
```css
/* ✅ Design tokens */
.form {
  padding: var(--spacing-24);
  gap: var(--spacing-16);
}

.header h2 {
  font-size: var(--font-2xl);
  color: var(--color-text);
}
```

## Benefícios

### 1. Consistência Visual
- Todas as páginas usam os mesmos componentes
- Cores e espaçamentos padronizados
- Estados de foco/hover consistentes

### 2. Manutenibilidade
- Alterações em um componente refletem em todo o app
- Fácil atualizar tema (basta mudar CSS variables)
- Código mais limpo e legível

### 3. Performance de Desenvolvimento
- Novos formulários são mais rápidos de criar
- Menos código duplicado
- Componentes reutilizáveis bem documentados

### 4. Acessibilidade
- Estados de foco consistentes
- Cores com contraste adequado
- Componentes seguem boas práticas

## Próximos Passos

### Páginas a Refatorar
1. ✅ WorkspaceList (CONCLUÍDO)
2. ⏳ PeopleList
3. ⏳ AccountsList
4. ⏳ Modais de Transações (Create, Edit)
5. ⏳ Modais de Credit Cards (Create, Upload Invoice)
6. ⏳ Categories Page
7. ⏳ Budgets Page
8. ⏳ Imports Page
9. ⏳ Dashboard Page
10. ⏳ Settings Page

### Checklist de Refatoração

Para cada componente/página:
- [ ] Remover cores hardcoded (#...)
- [ ] Substituir elementos nativos por componentes do DS
- [ ] Usar CSS variables para todos os valores
- [ ] Substituir modals customizados por `<Modal>` ou `<ConfirmDialog>`
- [ ] Usar `<EmptyState>` para listas vazias
- [ ] Substituir botões por `<Button>` ou `<IconButton>`
- [ ] Inputs/Selects/Textareas devem usar componentes do DS
- [ ] Checkboxes devem usar `<Checkbox>`
- [ ] Validar que não há `!important` no CSS
- [ ] Testar estados: normal, hover, focus, disabled, error

## Padrões Estabelecidos

### Formulários
```tsx
<form className={styles.form}>
  <Input label="Nome" fullWidth required />
  <Select label="Tipo" options={...} fullWidth />
  <Textarea label="Descrição" fullWidth />
  
  <div className={styles.formActions}>
    <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
    <Button type="submit">Salvar</Button>
  </div>
</form>
```

### Listas
```tsx
{items.length === 0 ? (
  <EmptyState
    icon={<Icon />}
    title="Nenhum item encontrado"
    description="Adicione o primeiro item"
    action={<Button>Adicionar</Button>}
  />
) : (
  <div className={styles.list}>
    {items.map(item => (
      <Card key={item.id} padding="md">
        <div className={styles.itemContent}>...</div>
        <div className={styles.itemActions}>
          <IconButton variant="default"><Edit2 /></IconButton>
          <IconButton variant="danger"><Trash2 /></IconButton>
        </div>
      </Card>
    ))}
  </div>
)}
```

### Modais
```tsx
// Modal simples
<Modal isOpen={open} onClose={close} title="Título">
  <Content />
</Modal>

// Confirmação de exclusão
<ConfirmDialog
  isOpen={!!deletingId}
  onClose={() => setDeletingId(null)}
  onConfirm={handleDelete}
  title="Confirmar Exclusão"
  message="Tem certeza?"
  confirmVariant="danger"
/>
```

### Arquivos Modificados (Migração Toast)

- `apps/frontend/src/App.tsx` - Substituído `<Toaster />` por `<ToastProvider />`
- 12 arquivos com imports atualizados de `sonner` para `../components/UI`:
  - `RecurringTransactionsPage.tsx`
  - `CategoriesPage.tsx`
  - `TransactionsPage.tsx`
  - `ResetDataModal.tsx`
  - `UploadInvoiceModal.tsx`
  - `WorkspaceList.tsx`
  - `EditTransactionModal.tsx`
  - `PeopleList.tsx`
  - `AccountsList.tsx`
  - `CreateCreditCardModal.tsx`
  - `CreateTransactionModal.tsx`
  - `WelcomeTour.tsx`

## Arquivos Modificados

### Novos Componentes (14 arquivos)
- `apps/frontend/src/components/UI/Select.tsx` + `.module.css`
- `apps/frontend/src/components/UI/FormGroup.tsx` + `.module.css`
- `apps/frontend/src/components/UI/Textarea.tsx` + `.module.css`
- `apps/frontend/src/components/UI/Checkbox.tsx` + `.module.css`
- `apps/frontend/src/components/UI/IconButton.tsx` + `.module.css`
- `apps/frontend/src/components/UI/EmptyState.tsx` + `.module.css`
- `apps/frontend/src/components/UI/Toast.tsx` + `.module.css`
- `apps/frontend/src/components/UI/index.ts` (barrel exports)

### Refatorados
- `apps/frontend/src/components/Settings/WorkspaceList.tsx`
- `apps/frontend/src/components/Settings/WorkspaceList.module.css`

### Linhas Reduzidas
- **WorkspaceList.module.css**: 461 linhas → 200 linhas (redução de ~57%)
- Eliminados: ~250 linhas de CSS com cores hardcoded e estilos duplicados

## Status

- ✅ 7 novos componentes criados (Select, FormGroup, Textarea, Checkbox, IconButton, EmptyState, Toast)
- ✅ 2 páginas refatoradas (WorkspaceList, Transactions/RecurringTransactions com IconButton+ConfirmDialog)
- ✅ Sistema de toast migrado de Sonner (lib externa) para componente próprio do DS
- ✅ Sistema de tokens documentado
- ⏳ 8 páginas restantes para refatorar completamente
- ⏳ Documentação de padrões em andamento

**Próxima ação**: Refatorar PeopleList e AccountsList completamente seguindo o mesmo padrão.
