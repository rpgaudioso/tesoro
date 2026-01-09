import { Edit2, Eye, Heart, Trash2 } from 'lucide-react';
import { Card, IconButton } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function IconButtonDetailPage() {
  return (
    <SimpleComponentPage
      title="IconButton"
      subtitle="Botão circular otimizado para ícones"
      overview="IconButtons são botões compactos que contém apenas um ícone, ideal para toolbars e ações rápidas."
      usage={
        <Card>
          <h2>Variantes e Tamanhos</h2>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton variant="primary" size="sm"><Edit2 size={16} /></IconButton>
            <IconButton variant="primary" size="md"><Edit2 size={18} /></IconButton>
            <IconButton variant="primary" size="lg"><Edit2 size={20} /></IconButton>
            <IconButton variant="danger"><Trash2 size={18} /></IconButton>
            <IconButton variant="default"><Eye size={18} /></IconButton>
            <IconButton variant="ghost"><Heart size={18} /></IconButton>
          </div>
        </Card>
      }
      installation={`import { IconButton } from '@/components/UI';
import { Edit2 } from 'lucide-react';`}
      basicExample={`<IconButton variant="primary" size="md">
  <Edit2 size={18} />
</IconButton>`}
      propsCode={`interface IconButtonProps {
  variant?: 'default' | 'primary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: ReactNode;
}`}
      styleTokens={`/* Tamanhos */
sm: 32px;
md: 40px;
lg: 48px;

border-radius: var(--radius-full);
display: flex;
align-items: center;
justify-content: center;`}
    />
  );
}
