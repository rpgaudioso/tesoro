import { Bell, CheckCircle, Info, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, CodeBlock, ConfirmDialog, EmptyState, FormGroup, IconButton, Input, Modal, PageHeader, Select, Textarea, toast } from '../components/UI';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';
import styles from './DesignSystemPage.module.css';

export default function DesignSystemPage() {
  const { workspaceId } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Test: Create notification via API
  const handleCreateNotification = async () => {
    if (!workspaceId) {
      toast.error('Nenhum workspace selecionado');
      return;
    }

    try {
      await api.post(`/workspaces/${workspaceId}/notifications`, {
        type: 'RECURRING_TRANSACTION_CREATED',
        title: 'Notificação de Teste',
        message: `Esta é uma notificação de teste criada em ${new Date().toLocaleTimeString()}`,
        data: {
          testData: true,
          timestamp: new Date().toISOString(),
        },
      });
      toast.success('Notificação criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      toast.error('Erro ao criar notificação');
    }
  };



  // Lista de componentes para busca
  const components = useMemo(() => [
    { id: 'toast', title: 'Toast', description: 'Notificações toast temporárias para feedback ao usuário' },
    { id: 'button', title: 'Button', description: 'Botão padrão com múltiplas variantes e tamanhos' },
    { id: 'iconbutton', title: 'IconButton', description: 'Botão circular otimizado para ícones' },
    { id: 'input', title: 'Input', description: 'Campo de entrada de texto com label e validação' },
    { id: 'select', title: 'Select', description: 'Dropdown de seleção estilizado' },
    { id: 'textarea', title: 'Textarea', description: 'Campo de texto multi-linha' },
    { id: 'checkbox', title: 'Checkbox', description: 'Checkbox estilizado com label integrado' },
    { id: 'formgroup', title: 'FormGroup', description: 'Wrapper para agrupar label + input + error' },
    { id: 'alert', title: 'Alert', description: 'Mensagens de feedback inline com ícones contextuais' },
    { id: 'card', title: 'Card', description: 'Container com elevação e padding padronizado' },
    { id: 'modal', title: 'Modal', description: 'Dialog modal centralizado com overlay' },
    { id: 'confirmdialog', title: 'ConfirmDialog', description: 'Dialog de confirmação para ações destrutivas' },
    { id: 'emptystate', title: 'EmptyState', description: 'Componente para exibir estado vazio de listas' },
    { id: 'pageheader', title: 'PageHeader', description: 'Cabeçalho padronizado para páginas' },
    { id: 'codeblock', title: 'CodeBlock', description: 'Bloco de código com syntax highlighting e botão de copiar' },
    { id: 'notifications', title: 'Notification System', description: 'Sistema completo de notificações com badge e painel' },
  ], []);

  const filteredComponents = useMemo(() => {
    if (!searchTerm) return components;
    const term = searchTerm.toLowerCase();
    return components.filter(
      (comp) =>
        comp.title.toLowerCase().includes(term) ||
        comp.description.toLowerCase().includes(term)
    );
  }, [searchTerm, components]);

  const ComponentSection = ({ 
    id,
    title, 
    description, 
    importCode,
    additionalCode,
    children 
  }: { 
    id: string;
    title: string; 
    description: string; 
    importCode: string;
    additionalCode?: string;
    children: React.ReactNode;
  }) => {
    // Se há busca ativa e este componente não está nos resultados, não renderiza
    if (searchTerm && !filteredComponents.find(c => c.id === id)) {
      return null;
    }

    return (
      <div id={id}>
        <Card>
          <div className={styles.componentHeader}>
            <div>
              <h2 className={styles.componentTitle}>{title}</h2>
              <p className={styles.componentDescription}>{description}</p>
            </div>
          </div>
          <div className={styles.componentLayout}>
            <div className={styles.componentPreview}>
              {children}
            </div>
            <div className={styles.componentCode}>
              <CodeBlock code={importCode} language="tsx" />
              {additionalCode && <CodeBlock code={additionalCode} language="tsx" />}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const selectOptions = [
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3' },
  ];

  return (
    <div className={styles.container}>
      <PageHeader
        title="🎨 Design System"
        subtitle="Documentação completa dos componentes do Tesoro"
      />

      {/* Search */}
      <div className={styles.searchContainer}>
        <Input
          placeholder="Buscar componentes... (ex: button, alert, modal)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        {searchTerm && (
          <div className={styles.searchResults}>
            {filteredComponents.length} {filteredComponents.length === 1 ? 'componente encontrado' : 'componentes encontrados'}
          </div>
        )}
      </div>

      <div className={styles.sections}>
        {/* Toast Notifications */}
        <ComponentSection
          id="toast"
          title="Toast"
          description="Notificações toast temporárias para feedback ao usuário"
          importCode={`import { toast } from '@/components/UI';

// Uso básico
toast.success('Operação realizada com sucesso!');
toast.error('Erro ao processar solicitação');
toast.warning('Atenção: verifique os dados');
toast.info('Informação importante');`}
        >
          <div className={styles.buttonGrid}>
            <Button variant="primary" onClick={() => toast.success('Operação realizada com sucesso!')}>
              <CheckCircle size={18} />
              Success
            </Button>
            <Button variant="danger" onClick={() => toast.error('Erro ao processar solicitação')}>
              <XCircle size={18} />
              Error
            </Button>
            <Button variant="secondary" onClick={() => toast.warning('Atenção: verifique os dados')}>
              Warning
            </Button>
            <Button variant="secondary" onClick={() => toast.info('Informação importante')}>
              <Info size={18} />
              Info
            </Button>
          </div>
        </ComponentSection>

        {/* Button */}
        <ComponentSection
          id="button"
          title="Button"
          description="Botão padrão com múltiplas variantes e tamanhos"
          importCode={`import { Button } from '@/components/UI';

<Button variant="primary" onClick={handleClick}>
  Primary Button
</Button>`}
          additionalCode={`// Props disponíveis
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
}`}
        >
          <div className={styles.buttonGrid}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </ComponentSection>

        {/* IconButton */}
        <ComponentSection
          id="iconbutton"
          title="IconButton"
          description="Botão circular otimizado para ícones"
          importCode={`import { IconButton } from '@/components/UI';
import { Edit2 } from 'lucide-react';

<IconButton variant="primary" size="md">
  <Edit2 size={18} />
</IconButton>`}
          additionalCode={`// Variants: default, primary, danger, ghost
// Sizes: sm (32px), md (40px), lg (48px)
// Ideal para ações em tabelas: Edit, Delete, View`}
        >
          <div className={styles.buttonGrid}>
            <IconButton variant="default" size="sm">
              <Info size={16} />
            </IconButton>
            <IconButton variant="primary" size="md">
              <CheckCircle size={18} />
            </IconButton>
            <IconButton variant="danger" size="md">
              <XCircle size={18} />
            </IconButton>
            <IconButton variant="ghost" size="lg">
              <Bell size={20} />
            </IconButton>
          </div>
        </ComponentSection>

        {/* Input */}
        <ComponentSection
          id="input"
          title="Input"
          description="Campo de entrada de texto com label e validação"
          importCode={`import { Input } from '@/components/UI';

<Input 
  label="Nome completo"
  placeholder="Digite seu nome..."
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={errors.name}
  required
  fullWidth
/>`}
          additionalCode={`// Props disponíveis
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}`}
        >
          <div className={styles.formGrid}>
            <Input
              label="Input padrão"
              placeholder="Digite algo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
            <Input
              label="Input com erro"
              placeholder="Campo obrigatório"
              error="Este campo é obrigatório"
              fullWidth
            />
            <Input
              label="Input desabilitado"
              value="Valor desabilitado"
              disabled
              fullWidth
            />
          </div>
        </ComponentSection>

        {/* Select */}
        <ComponentSection
          id="select"
          title="Select"
          description="Dropdown de seleção com opções customizadas"
          importCode={`import { Select } from '@/components/UI';

const options = [
  { value: 'opt1', label: 'Opção 1' },
  { value: 'opt2', label: 'Opção 2' }
];

<Select
  label="Categoria"
  options={options}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  fullWidth
/>`}
          additionalCode={`// Options format
type SelectOption = {
  value: string;
  label: string;
};

// Ideal para: categorias, status, filtros`}
        >
          <div className={styles.formGrid}>
            <Select
              label="Select padrão"
              options={selectOptions}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              fullWidth
            />
            <Select
              label="Select com placeholder"
              options={selectOptions}
              placeholder="Selecione uma opção..."
              fullWidth
            />
          </div>
        </ComponentSection>

        {/* Textarea */}
        <ComponentSection
          id="textarea"
          title="Textarea"
          description="Campo de texto multi-linha"
          importCode={`import { Textarea } from '@/components/UI';

<Textarea
  label="Descrição"
  placeholder="Digite uma descrição detalhada..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  fullWidth
/>`}
          additionalCode={`// Props: label, placeholder, rows, error, disabled
// Resize: vertical (padrão) | horizontal | both | none`}
        >
          <Textarea
            label="Textarea"
            placeholder="Digite uma mensagem..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            rows={4}
            fullWidth
          />
        </ComponentSection>

        {/* Checkbox */}
        <ComponentSection
          id="checkbox"
          title="Checkbox"
          description="Checkbox estilizado com label integrado"
          importCode={`import { Checkbox } from '@/components/UI';

<Checkbox
  label="Aceito os termos e condições"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`}
        >
          <FormGroup label="Opções">
            <Checkbox
              label="Checkbox marcado"
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
            <Checkbox label="Checkbox desmarcado" checked={false} onChange={() => {}} />
            <Checkbox label="Checkbox com erro" checked={false} error="Obrigatório" onChange={() => {}} />
          </FormGroup>
        </ComponentSection>

        {/* FormGroup */}
        <ComponentSection
          id="formgroup"
          title="FormGroup"
          description="Wrapper para agrupar label + input + error"
          importCode={`import { FormGroup, Input } from '@/components/UI';

<FormGroup label="Email" error={errors.email} required>
  <Input
    type="email"
    placeholder="seu@email.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</FormGroup>`}
          additionalCode={`// Padroniza: spacing, label, required (*), error message
// Use para consistência em formulários complexos`}
        >
          <FormGroup label="Campo com FormGroup" required>
            <Input placeholder="Exemplo..." fullWidth />
          </FormGroup>
        </ComponentSection>

        {/* Alert */}
        <ComponentSection
          id="alert"
          title="Alert"
          description="Mensagens de feedback inline com ícones contextuais"
          importCode={`import { Alert } from '@/components/UI';

<Alert variant="success">
  Dados salvos com sucesso!
</Alert>

<Alert variant="info">
  <strong>Importante:</strong> Verifique os dados antes de continuar.
</Alert>`}
          additionalCode={`// Variants: success, danger, warning, info
// Ícones automáticos: CheckCircle, XCircle, AlertCircle, Info
// Info com background azul (#dbeafe)
// Cores específicas para cada variant
// Aceita HTML/JSX como children`}
        >
          <div className={styles.alertGrid}>
            <Alert variant="success">Operação realizada com sucesso!</Alert>
            <Alert variant="danger">Erro ao processar a solicitação.</Alert>
            <Alert variant="warning">Atenção: verifique os dados antes de continuar.</Alert>
            <Alert variant="info">Esta é uma mensagem informativa para o usuário.</Alert>
          </div>
        </ComponentSection>

        {/* Card */}
        <ComponentSection
          id="card"
          title="Card"
          description="Container com elevação e padding padronizado"
          importCode={`import { Card } from '@/components/UI';

<Card padding="lg">
  <h3>Título do Card</h3>
  <p>Conteúdo do card...</p>
</Card>`}
          additionalCode={`// Padding: sm (16px), md (24px), lg (32px)
// Shadow: var(--shadow-sm)
// Border-radius: var(--radius-12)`}
        >
          <div className={styles.cardGrid}>
            <Card padding="sm">
              <strong>Padding SM</strong>
              <p>Card com padding pequeno</p>
            </Card>
            <Card padding="md">
              <strong>Padding MD</strong>
              <p>Card com padding médio</p>
            </Card>
            <Card padding="lg">
              <strong>Padding LG</strong>
              <p>Card com padding grande</p>
            </Card>
          </div>
        </ComponentSection>

        {/* Modal */}
        <ComponentSection
          id="modal"
          title="Modal"
          description="Modal centralizado com overlay e animação"
          importCode={`import { Modal, Button } from '@/components/UI';

const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Título do Modal"
>
  <p>Conteúdo do modal...</p>
  <Button onClick={() => setIsOpen(false)}>Fechar</Button>
</Modal>`}
          additionalCode={`// Fecha com: botão X, tecla ESC, click no overlay
// Centralizado com animação fade + scale
// Overlay semi-transparente com blur`}
        >
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Abrir Modal
          </Button>
        </ComponentSection>

        {/* ConfirmDialog */}
        <ComponentSection
          id="confirmdialog"
          title="ConfirmDialog"
          description="Dialog de confirmação para ações destrutivas"
          importCode={`import { ConfirmDialog } from '@/components/UI';

<ConfirmDialog
  isOpen={deleteConfirm}
  onCancel={() => setDeleteConfirm(false)}
  onConfirm={handleDelete}
  title="Confirmar Exclusão"
  message="Tem certeza? Esta ação não pode ser desfeita."
  variant="danger"
  confirmLabel="Sim, excluir"
  cancelLabel="Cancelar"
/>`}
          additionalCode={`// Variants: danger, warning, info
// Botões: Cancel (secundário) + Confirm (variant)
// Ideal para: delete, logout, ações irreversíveis`}
        >
          <Button variant="danger" onClick={() => setShowConfirmDialog(true)}>
            Abrir Confirm Dialog
          </Button>
        </ComponentSection>

        {/* EmptyState */}
        <ComponentSection
          id="emptystate"
          title="EmptyState"
          description="Componente para exibir estado vazio de listas"
          importCode={`import { EmptyState, Button } from '@/components/UI';
import { Inbox } from 'lucide-react';

<EmptyState
  icon={<Inbox size={48} />}
  title="Nenhuma transação encontrada"
  description="Adicione a primeira transação para começar."
  action={
    <Button variant="primary" onClick={handleAdd}>
      Nova Transação
    </Button>
  }
/>`}
          additionalCode={`// Centralizado vertical e horizontal
// Ícone + título + descrição + action (opcional)
// Cores neutras para não competir com conteúdo`}
        >
          <EmptyState
            icon={<Bell size={48} />}
            title="Nenhum item encontrado"
            description="Não há itens para exibir no momento. Adicione o primeiro item para começar."
            action={
              <Button variant="primary" onClick={() => toast.info('Ação do EmptyState')}>
                Adicionar Item
              </Button>
            }
          />
        </ComponentSection>

        {/* PageHeader */}
        <ComponentSection
          id="pageheader"
          title="PageHeader"
          description="Cabeçalho padronizado para páginas"
          importCode={`import { PageHeader, Button } from '@/components/UI';

<PageHeader
  title="Transações"
  subtitle="Gerencie todas as suas transações"
  actions={
    <Button variant="primary" onClick={handleNew}>
      Nova Transação
    </Button>
  }
/>`}
          additionalCode={`// Título grande + subtitle menor
// Actions opcional (botão ou grupo de botões)
// Margin-bottom automático`}
        >
          <PageHeader
            title="Página de Exemplo"
            subtitle="Este é um exemplo de PageHeader"
            actions={<Button variant="primary">Ação</Button>}
          />
        </ComponentSection>

        {/* CodeBlock */}
        <ComponentSection
          id="codeblock"
          title="CodeBlock"
          description="Bloco de código com syntax highlighting e botão de copiar"
          importCode={`import { CodeBlock } from '@/components/UI';

<CodeBlock 
  code={codeString} 
  language="tsx"
  showLineNumbers={false}
/>`}
          additionalCode={`// Props disponíveis
interface CodeBlockProps {
  code: string;
  language?: string; // padrão: 'tsx'
  showLineNumbers?: boolean; // padrão: false
}

// Linguagens suportadas: tsx, ts, jsx, js, css, json, etc.
// Tema claro para melhor legibilidade
// Botão de copiar integrado
// Overflow horizontal automático`}
        >
          <CodeBlock 
            code={`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}
            language="tsx"
          />
        </ComponentSection>

        {/* Notification System */}
        <ComponentSection
          id="notifications"
          title="Notification System"
          description="Sistema completo de notificações com badge e painel"
          importCode={`// Backend: criar notificação
import { NotificationsService } from '@/notifications';

await notificationsService.create({
  workspaceId,
  type: 'RECURRING_TRANSACTION_CREATED',
  title: 'Nova transação recorrente',
  message: 'A transação "Aluguel" foi criada.',
  data: { transactionId: '...' }
});

// Frontend: hook automático
import { useUnreadCount } from '@/hooks/useNotifications';

const { data } = useUnreadCount(workspaceId);
// Badge atualiza a cada 30s`}
          additionalCode={`// Tipos disponíveis:
- RECURRING_TRANSACTION_CREATED
- RECURRING_TRANSACTION_EXECUTED
- INVOICE_DUE_SOON
- BUDGET_EXCEEDED
- IMPORT_COMPLETED

// Badge vermelho com contador
// Panel slide-down animado
// Auto-refresh 30s`}
        >
          <Button variant="primary" onClick={handleCreateNotification}>
            <Bell size={18} />
            Criar Notificação de Teste
          </Button>
          <div style={{ marginTop: '16px' }}>
            <Alert variant="info">
              Clique no ícone de sino no topo para ver a notificação criada
            </Alert>
          </div>
        </ComponentSection>

        {/* Design Tokens */}
        <Card>
          <div className={styles.componentHeader}>
            <div>
              <h2 className={styles.componentTitle}>Design Tokens</h2>
              <p className={styles.componentDescription}>
                Todas as variáveis CSS utilizadas no sistema
              </p>
            </div>
          </div>
          <div className={styles.tokensGrid}>
            <div className={styles.tokenSection}>
              <h4 className={styles.tokenTitle}>Spacing</h4>
              <CodeBlock code={`--spacing-4: 4px
--spacing-6: 6px
--spacing-8: 8px
--spacing-10: 10px
--spacing-12: 12px
--spacing-16: 16px
--spacing-20: 20px
--spacing-24: 24px
--spacing-32: 32px
--spacing-40: 40px
--spacing-48: 48px
--spacing-64: 64px`} language="css" />
            </div>
            <div className={styles.tokenSection}>
              <h4 className={styles.tokenTitle}>Colors</h4>
              <CodeBlock code={`--color-primary: #FF5722
--color-primary-hover: #E64A19
--color-primary-light: rgba(255, 87, 34, 0.1)

--color-success: #4CAF50
--color-danger: #F44336
--color-warning: #FF9800

--color-text: #1F2937
--color-text-secondary: #6B7280
--color-text-tertiary: #9CA3AF

--color-bg: #FFFFFF
--color-bg-secondary: #F9FAFB
--color-border: #E5E7EB`} language="css" />
            </div>
            <div className={styles.tokenSection}>
              <h4 className={styles.tokenTitle}>Typography</h4>
              <CodeBlock code={`--font-xs: 12px
--font-sm: 14px
--font-base: 16px
--font-lg: 18px
--font-xl: 20px
--font-2xl: 24px
--font-3xl: 30px
--font-4xl: 36px

--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700`} language="css" />
            </div>
            <div className={styles.tokenSection}>
              <h4 className={styles.tokenTitle}>Radius & Shadow</h4>
              <CodeBlock code={`--radius-6: 6px
--radius-8: 8px
--radius-12: 12px
--radius-16: 16px
--radius-full: 9999px

--shadow-xs: 0 1px 2px rgba(0,0,0,0.05)
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15)`} language="css" />
            </div>
          </div>
        </Card>
      </div>

      {/* Test Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Modal de Exemplo"
      >
        <div style={{ padding: '20px 0' }}>
          <p style={{ marginBottom: '16px' }}>
            Este é um modal de exemplo do Design System.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Você pode adicionar qualquer conteúdo aqui, incluindo formulários,
            listas e outros componentes.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={() => {
              setShowModal(false);
              toast.success('Ação confirmada no modal!');
            }}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Test Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onCancel={() => {
          setShowConfirmDialog(false);
          toast.info('Ação cancelada');
        }}
        onConfirm={() => {
          setShowConfirmDialog(false);
          toast.success('Ação confirmada!');
        }}
        title="Confirmar Ação"
        message="Tem certeza que deseja executar esta ação? Esta operação não pode ser desfeita."
        variant="danger"
      />
    </div>
  );
}
