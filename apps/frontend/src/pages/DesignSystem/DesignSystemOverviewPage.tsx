import { Link } from 'react-router-dom';
import { Card, PageHeader } from '../../components/UI';
import styles from './DesignSystemOverviewPage.module.css';

interface Component {
  id: string;
  name: string;
  description: string;
  status: 'implemented' | 'planned';
}

const components: Component[] = [
  { id: 'accordion', name: 'Accordion', description: 'Expandir/colapsar seções de conteúdo (FAQ, configurações)', status: 'implemented' },
  { id: 'ailabel', name: 'AI Label', description: 'Label para indicar funcionalidades com inteligência artificial', status: 'implemented' },
  { id: 'alert', name: 'Alert', description: 'Mensagens de feedback inline com ícones contextuais', status: 'implemented' },
  { id: 'autocomplete', name: 'AutoComplete', description: 'Input com sugestões automáticas baseadas na digitação', status: 'implemented' },
  { id: 'avatargroup', name: 'AvatarGroup', description: 'Grupo compacto de avatares com contador de membros adicionais', status: 'implemented' },
  { id: 'badge', name: 'Badge', description: 'Indicador visual compacto para status, contadores e labels', status: 'implemented' },
  { id: 'banner', name: 'Banner', description: 'Mensagem persistente e destacada no topo ou base da página', status: 'implemented' },
  { id: 'breadcrumb', name: 'Breadcrumb', description: 'Navegação hierárquica entre páginas', status: 'implemented' },
  { id: 'button', name: 'Button', description: 'Botão padrão com múltiplas variantes e tamanhos', status: 'implemented' },
  { id: 'card', name: 'Card', description: 'Container com elevação e padding padronizado', status: 'implemented' },
  { id: 'carousel', name: 'Carousel', description: 'Carrossel de conteúdo com navegação automática ou manual', status: 'implemented' },
  { id: 'checkbox', name: 'Checkbox', description: 'Checkbox estilizado com label integrado', status: 'implemented' },
  { id: 'codeblock', name: 'CodeBlock', description: 'Bloco de código com syntax highlighting e botão de copiar', status: 'implemented' },
  { id: 'colorpicker', name: 'ColorPicker', description: 'Seletor de cores com input manual e paleta predefinida', status: 'implemented' },
  { id: 'confirmdialog', name: 'ConfirmDialog', description: 'Dialog de confirmação para ações destrutivas', status: 'implemented' },
  { id: 'containedlist', name: 'ContainedList', description: 'Lista com bordas e divisores para dados estruturados', status: 'implemented' },
  { id: 'contentswitcher', name: 'ContentSwitcher', description: 'Alternador entre diferentes visualizações (lista/grade)', status: 'implemented' },
  { id: 'currencyinput', name: 'CurrencyInput', description: 'Input para valores monetários com formatação automática', status: 'implemented' },
  { id: 'datatable', name: 'DataTable', description: 'Tabela com ordenação, paginação e renderização customizada', status: 'implemented' },
  { id: 'datepicker', name: 'DatePicker', description: 'Seletor de data com calendário dropdown', status: 'implemented' },
  { id: 'daterangepicker', name: 'DateRangePicker', description: 'Seletor de intervalo de datas para filtros e relatórios', status: 'implemented' },
  { id: 'drawer', name: 'Drawer', description: 'Painel lateral deslizante para conteúdo secundário', status: 'implemented' },
  { id: 'dropdown', name: 'Dropdown', description: 'Menu dropdown com ações e ícones', status: 'implemented' },
  { id: 'emptystate', name: 'EmptyState', description: 'Componente para exibir estado vazio de listas', status: 'implemented' },
  { id: 'fileupload', name: 'FileUploadDragDrop', description: 'Upload de arquivos com drag-and-drop e preview', status: 'implemented' },
  { id: 'formgroup', name: 'FormGroup', description: 'Wrapper para agrupar label + input + error', status: 'implemented' },
  { id: 'iconbutton', name: 'IconButton', description: 'Botão circular otimizado para ícones', status: 'implemented' },
  { id: 'inlineloading', name: 'InlineLoading', description: 'Loading inline para feedback em ações específicas', status: 'implemented' },
  { id: 'input', name: 'Input', description: 'Campo de entrada de texto com label e validação', status: 'implemented' },
  { id: 'link', name: 'Link', description: 'Link estilizado para navegação interna e externa', status: 'implemented' },
  { id: 'list', name: 'List', description: 'Lista estilizada para conteúdo textual ordenado ou não-ordenado', status: 'implemented' },
  { id: 'loading', name: 'Loading', description: 'Indicador de carregamento (spinner) com tamanhos', status: 'implemented' },
  { id: 'menubutton', name: 'MenuButton', description: 'Botão com menu dropdown de ações relacionadas', status: 'implemented' },
  { id: 'modal', name: 'Modal', description: 'Dialog modal centralizado com overlay', status: 'implemented' },
  { id: 'multiselect', name: 'MultiSelect', description: 'Seletor múltiplo com busca e tags visuais', status: 'implemented' },
  { id: 'notification', name: 'Notification', description: 'Notificação persistente para avisos importantes', status: 'implemented' },
  { id: 'numberinput', name: 'NumberInput', description: 'Input numérico com controles de incremento/decremento', status: 'implemented' },
  { id: 'pageheader', name: 'PageHeader', description: 'Cabeçalho padronizado para páginas', status: 'implemented' },
  { id: 'pagination', name: 'Pagination', description: 'Navegação entre páginas de dados', status: 'implemented' },
  { id: 'popover', name: 'Popover', description: 'Conteúdo flutuante contextual para detalhes rápidos', status: 'implemented' },
  { id: 'portal', name: 'Portal', description: 'Renderiza componentes fora da hierarquia DOM', status: 'implemented' },
  { id: 'progressbar', name: 'ProgressBar', description: 'Barra de progresso para feedback visual de carregamento', status: 'implemented' },
  { id: 'progressindicator', name: 'ProgressIndicator', description: 'Wizard/Stepper para processos multi-etapa', status: 'implemented' },
  { id: 'radiobutton', name: 'RadioButton', description: 'Seleção única entre opções mutuamente exclusivas', status: 'implemented' },
  { id: 'rating', name: 'Rating', description: 'Avaliação com estrelas para coletar ou exibir classificações', status: 'implemented' },
  { id: 'search', name: 'Search', description: 'Campo de busca avançado com botão de limpar', status: 'implemented' },
  { id: 'select', name: 'Select', description: 'Dropdown de seleção estilizado', status: 'implemented' },
  { id: 'skeleton', name: 'Skeleton', description: 'Placeholder animado que indica carregamento de conteúdo', status: 'implemented' },
  { id: 'slider', name: 'Slider', description: 'Seletor de range para valores numéricos (filtros)', status: 'implemented' },
  { id: 'sparkline', name: 'Sparkline', description: 'Mini gráfico de linha para mostrar tendências inline', status: 'implemented' },
  { id: 'statcard', name: 'StatisticsCard', description: 'Card destacado para métricas e KPIs importantes', status: 'implemented' },
  { id: 'statusindicator', name: 'StatusIndicator', description: 'Indicador visual compacto de status ou estado', status: 'implemented' },
  { id: 'stepper', name: 'Stepper', description: 'Indicador de progresso para processos multi-etapas', status: 'implemented' },
  { id: 'structuredlist', name: 'StructuredList', description: 'Lista estruturada com colunas para comparações', status: 'implemented' },
  { id: 'tabs', name: 'Tabs', description: 'Navegação por abas para organizar conteúdo', status: 'implemented' },
  { id: 'tag', name: 'Tag', description: 'Labels removíveis para filtros e categorias', status: 'implemented' },
  { id: 'textarea', name: 'Textarea', description: 'Campo de texto multi-linha', status: 'implemented' },
  { id: 'tile', name: 'Tile', description: 'Card interativo para seleção de opções', status: 'implemented' },
  { id: 'timeline', name: 'Timeline', description: 'Linha do tempo vertical para eventos cronológicos', status: 'implemented' },
  { id: 'toast', name: 'Toast', description: 'Notificações toast temporárias para feedback ao usuário', status: 'implemented' },
  { id: 'toggle', name: 'Toggle', description: 'Switch para ativar/desativar opções', status: 'implemented' },
  { id: 'toggletip', name: 'Toggletip', description: 'Tooltip interativo com conteúdo clicável', status: 'implemented' },
  { id: 'tooltip', name: 'Tooltip', description: 'Dicas contextuais ao passar o mouse', status: 'implemented' },
  { id: 'treeview', name: 'TreeView', description: 'Visualização hierárquica expansível (pastas, categorias)', status: 'implemented' },
];

export default function DesignSystemOverviewPage() {
  return (
    <div className={styles.container}>
      <PageHeader
        title="🎨 Design System"
        subtitle={`Biblioteca de ${components.length} componentes reutilizáveis do Tesoro`}
      />

      <div className={styles.intro}>
        <Card>
          <p className={styles.introText}>
            Componentes são os blocos fundamentais do nosso sistema de design. 
            Sua reutilização sistemática ajuda a criar consistência visual e funcional 
            em toda a aplicação. Cada componente foi projetado para resolver um problema 
            específico de UI e trabalhar harmoniosamente com os demais.
          </p>
        </Card>
      </div>

      <div className={styles.componentsSection}>
        <h2 className={styles.sectionTitle}>Componentes</h2>
        <div className={styles.componentsGrid}>
          {components.map((component) => (
            <Link
              key={component.id}
              to={`/app/design-system/${component.id}`}
              className={styles.componentCard}
            >
              <Card padding="md">
                <h3 className={styles.componentName}>{component.name}</h3>
                <p className={styles.componentDescription}>{component.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.tokensSection}>
        <h2 className={styles.sectionTitle}>Design Tokens</h2>
        <Card>
          <p className={styles.introText}>
            Todos os componentes utilizam um sistema unificado de tokens CSS para 
            garantir consistência de cores, espaçamentos, tipografia e outros valores.
          </p>
          <Link to="/app/design-system/tokens" className={styles.link}>
            Ver Design Tokens →
          </Link>
        </Card>
      </div>
    </div>
  );
}
