import { Edit, Trash2 } from 'lucide-react';
import { Button, ContainedList, ContainedListItem } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ContainedListDetailPage() {
  return (
    <SimpleComponentPage
      title="Contained List"
      subtitle="Lista com bordas e divisores para apresentação estruturada"
      overview="Contained List apresenta itens em uma lista com bordas e divisores claros, ideal para listas de configurações, opções ou dados estruturados."
      usage={
        <>
          <div className="card">
            <h3 className="section-title">Lista Básica</h3>
            <ContainedList header="Configurações">
              <ContainedListItem>Notificações por email</ContainedListItem>
              <ContainedListItem>Notificações push</ContainedListItem>
              <ContainedListItem>Alertas de segurança</ContainedListItem>
            </ContainedList>
          </div>
          <div className="card">
            <h3 className="section-title">Com Ações</h3>
            <ContainedList header="Usuários">
              <ContainedListItem action={
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="sm" variant="ghost"><Edit size={16} /></Button>
                  <Button size="sm" variant="ghost"><Trash2 size={16} /></Button>
                </div>
              }>
                João Silva
              </ContainedListItem>
              <ContainedListItem action={
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="sm" variant="ghost"><Edit size={16} /></Button>
                  <Button size="sm" variant="ghost"><Trash2 size={16} /></Button>
                </div>
              }>
                Maria Santos
              </ContainedListItem>
            </ContainedList>
          </div>
        </>
      }
      installation="import { ContainedList, ContainedListItem } from '@/components/UI';"
      basicExample={`<ContainedList header="Título">
  <ContainedListItem>Item 1</ContainedListItem>
  <ContainedListItem>Item 2</ContainedListItem>
  <ContainedListItem 
    action={<Button size="sm">Ação</Button>}
  >
    Item com ação
  </ContainedListItem>
</ContainedList>`}
      propsCode={`interface ContainedListProps {
  children: ReactNode;
  header?: string;
  kind?: 'default' | 'disclosed';
}

interface ContainedListItemProps {
  children: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
}`}
      styleTokens={`border: 1px solid var(--color-border);
border-radius: var(--radius-8);
padding: var(--spacing-12) var(--spacing-16);
font-size: var(--font-sm);`}
      whenToUse={[
        'Para listas de configurações',
        'Para apresentar opções ou preferências',
        'Para listas estruturadas com ações',
      ]}
      whenNotToUse={[
        'Para listas complexas com muitos dados (use DataTable)',
        'Para navegação (use Menu ou Nav)',
        'Para listas simples sem estrutura (use List)',
      ]}
    />
  );
}
