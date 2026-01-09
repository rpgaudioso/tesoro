import { StructuredList, StructuredListCell, StructuredListRow } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function StructuredListDetailPage() {
  return (
    <SimpleComponentPage
      title="Structured List"
      subtitle="Lista estruturada com colunas para comparações"
      overview="Structured List apresenta dados em formato de lista com múltiplas colunas, ideal para comparações, especificações técnicas ou dados estruturados."
      usage={
        <>
          <div className="card">
            <h3 className="section-title">Lista Básica</h3>
            <StructuredList>
              <StructuredListRow head>
                <StructuredListCell head>Recurso</StructuredListCell>
                <StructuredListCell head>Descrição</StructuredListCell>
                <StructuredListCell head>Status</StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell>Dashboard</StructuredListCell>
                <StructuredListCell>Visão geral de métricas</StructuredListCell>
                <StructuredListCell>Ativo</StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell>Relatórios</StructuredListCell>
                <StructuredListCell>Geração de relatórios customizados</StructuredListCell>
                <StructuredListCell>Ativo</StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell>API</StructuredListCell>
                <StructuredListCell>Integração via REST API</StructuredListCell>
                <StructuredListCell>Beta</StructuredListCell>
              </StructuredListRow>
            </StructuredList>
          </div>
          <div className="card">
            <h3 className="section-title">Condensada</h3>
            <StructuredList condensed>
              <StructuredListRow head>
                <StructuredListCell head>Item</StructuredListCell>
                <StructuredListCell head>Valor</StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell>CPU</StructuredListCell>
                <StructuredListCell>Intel i7</StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell>RAM</StructuredListCell>
                <StructuredListCell>16GB</StructuredListCell>
              </StructuredListRow>
            </StructuredList>
          </div>
        </>
      }
      installation="import { StructuredList, StructuredListRow, StructuredListCell } from '@/components/UI';"
      basicExample={`<StructuredList>
  <StructuredListRow head>
    <StructuredListCell head>Coluna 1</StructuredListCell>
    <StructuredListCell head>Coluna 2</StructuredListCell>
  </StructuredListRow>
  <StructuredListRow>
    <StructuredListCell>Dado 1</StructuredListCell>
    <StructuredListCell>Dado 2</StructuredListCell>
  </StructuredListRow>
</StructuredList>`}
      propsCode={`interface StructuredListProps {
  children: ReactNode;
  condensed?: boolean;
  flush?: boolean;
}

interface StructuredListRowProps {
  children: ReactNode;
  head?: boolean;
}

interface StructuredListCellProps {
  children: ReactNode;
  head?: boolean;
}`}
      styleTokens={`border: 1px solid var(--color-border);
border-radius: var(--radius-8);
padding: var(--spacing-16);
font-size: var(--font-sm);`}
      whenToUse={[
        'Para comparar especificações técnicas',
        'Para apresentar dados estruturados em colunas',
        'Para listas de recursos e características',
      ]}
      whenNotToUse={[
        'Para grandes volumes de dados (use DataTable)',
        'Para listas simples (use List ou ContainedList)',
        'Para dados que precisam de ordenação/filtros (use DataTable)',
      ]}
    />
  );
}
