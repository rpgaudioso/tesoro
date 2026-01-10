import { List, ListItem } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ListDetailPage() {
  return (
    <SimpleComponentPage
      title="List"
      subtitle="Lista estilizada para conteúdo textual"
      overview="List é um componente simples para apresentar listas com marcadores ou numeradas, mantendo consistência visual com o design system."
      usage={
        <>
          <div>
            <h3 className="section-title">Lista Não-Ordenada</h3>
            <List>
              <ListItem>Primeiro item da lista</ListItem>
              <ListItem>Segundo item da lista</ListItem>
              <ListItem>Terceiro item da lista</ListItem>
            </List>
          </div>
          <div>
            <h3 className="section-title">Lista Ordenada</h3>
            <List ordered>
              <ListItem>Primeiro passo</ListItem>
              <ListItem>Segundo passo</ListItem>
              <ListItem>Terceiro passo</ListItem>
            </List>
          </div>
          <div>
            <h3 className="section-title">Lista Aninhada</h3>
            <List>
              <ListItem>
                Item principal
                <List nested>
                  <ListItem>Sub-item 1</ListItem>
                  <ListItem>Sub-item 2</ListItem>
                </List>
              </ListItem>
              <ListItem>Outro item</ListItem>
            </List>
          </div>
        </>
      }
      installation="import { List, ListItem } from '@/components/UI';"
      basicExample={`<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>

<List ordered>
  <ListItem>Passo 1</ListItem>
  <ListItem>Passo 2</ListItem>
</List>`}
      propsCode={`interface ListProps {
  children: ReactNode;
  ordered?: boolean;
  nested?: boolean;
}

interface ListItemProps {
  children: ReactNode;
}`}
      styleTokens={`font-size: var(--font-sm);
line-height: 1.6;
margin-bottom: var(--spacing-8);
color: var(--color-text);`}
      whenToUse={[
        'Para listas de texto simples',
        'Para instruções passo-a-passo',
        'Para listas aninhadas de conteúdo',
      ]}
      whenNotToUse={[
        'Para listas interativas (use ContainedList)',
        'Para dados estruturados (use StructuredList)',
        'Para dados tabulares (use DataTable)',
      ]}
    />
  );
}
