import { CreditCard, PiggyBank, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Tile, TileDescription, TileTitle } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function TileDetailPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SimpleComponentPage
      title="Tile"
      subtitle="Card interativo para seleção de opções"
      overview="Tile é um card clicável que permite selecionar opções de forma visual, ideal para escolha entre diferentes planos, categorias ou configurações."
      usage={
        <>
          <div>
            <h3 className="section-title">Tiles Selecionáveis</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <Tile 
                icon={Wallet}
                selected={selected === 'wallet'} 
                onClick={() => setSelected('wallet')}
              >
                <TileTitle>Carteira Digital</TileTitle>
                <TileDescription>Gerencie suas transações digitalmente</TileDescription>
              </Tile>
              <Tile 
                icon={CreditCard}
                selected={selected === 'card'} 
                onClick={() => setSelected('card')}
              >
                <TileTitle>Cartão de Crédito</TileTitle>
                <TileDescription>Controle seus gastos com cartão</TileDescription>
              </Tile>
              <Tile 
                icon={PiggyBank}
                selected={selected === 'savings'} 
                onClick={() => setSelected('savings')}
              >
                <TileTitle>Poupança</TileTitle>
                <TileDescription>Organize suas economias</TileDescription>
              </Tile>
            </div>
          </div>
          <div>
            <h3 className="section-title">Tile Desabilitado</h3>
            <Tile disabled icon={Wallet}>
              <TileTitle>Opção Desabilitada</TileTitle>
              <TileDescription>Esta opção não está disponível no momento</TileDescription>
            </Tile>
          </div>
        </>
      }
      installation="import { Tile, TileTitle, TileDescription } from '@/components/UI';"
      basicExample={`const [selected, setSelected] = useState(null);

<Tile 
  icon={CreditCard}
  selected={selected === 'card'} 
  onClick={() => setSelected('card')}
>
  <TileTitle>Título</TileTitle>
  <TileDescription>Descrição do tile</TileDescription>
</Tile>`}
      propsCode={`interface TileProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
}`}
      styleTokens={`padding: var(--spacing-20);
border: 2px solid var(--color-border);
border-radius: var(--radius-8);
transition: all 0.2s;

/* Selected */
border-color: var(--color-primary);
background: var(--color-primary-bg);`}
      whenToUse={[
        'Para selecionar entre planos ou opções',
        'Para escolher categorias ou tipos',
        'Para configurações com múltiplas escolhas',
      ]}
      whenNotToUse={[
        'Para apenas apresentar informação (use Card)',
        'Para seleção única simples (use RadioButton)',
        'Para listas longas (use Select)',
      ]}
    />
  );
}
