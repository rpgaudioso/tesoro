import { useState } from 'react';
import { Button, Drawer } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function DrawerDetailPage() {
  const [isOpen, setIsOpen] = useState(false);

  const whenToUse = [
    'Para exibir formulários secundários ou detalhes',
    'Para filtros avançados em tabelas e listas',
    'Para carrinho de compras ou resumo de pedido',
    'Para notificações detalhadas ou configurações',
  ];

  const whenNotToUse = [
    'Para conteúdo principal da página (use layout normal)',
    'Para alertas críticos (use Modal ou Alert)',
    'Para navegação principal (use Sidebar ou Menu)',
  ];

  return (
    <SimpleComponentPage
      title="Drawer"
      subtitle="Painel lateral deslizante"
      overview="Drawer é um painel lateral que desliza para exibir conteúdo secundário sem sair da página atual."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <Button onClick={() => setIsOpen(true)}>Abrir Drawer</Button>
            <Drawer
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Título do Drawer"
            >
              <p>Conteúdo do drawer aqui...</p>
            </Drawer>
          </div>
        </>
      }
      installation="import { Drawer } from '@/components/UI';"
      basicExample={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Abrir</Button>
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Título"
>
  Conteúdo
</Drawer>`}
      propsCode={`interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large';
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}`}
      styleTokens="--spacing-20, --radius-12, --shadow-xl"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
