import { Edit2, Eye, Heart, Trash2 } from 'lucide-react';
import { IconButton } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function IconButtonDetailPage() {
  return (
    <SimpleComponentPage
      title="IconButton"
      subtitle="Botão circular otimizado para ícones"
      overview="IconButtons são botões compactos que contém apenas um ícone, ideal para toolbars e ações rápidas."
      usage={
        <div>
          <h3 className="section-title">Variantes e Tamanhos</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton variant="primary" size="sm"><Edit2 size={16} /></IconButton>
            <IconButton variant="primary" size="md"><Edit2 size={18} /></IconButton>
            <IconButton variant="primary" size="lg"><Edit2 size={20} /></IconButton>
            <IconButton variant="danger"><Trash2 size={18} /></IconButton>
            <IconButton variant="default"><Eye size={18} /></IconButton>
            <IconButton variant="ghost"><Heart size={18} /></IconButton>
          </div>
        </div>
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
      whenToUse={[
        'Para ações rápidas em toolbars',
        'Em linhas de tabelas com múltiplas ações',
        'Para ícones de editar, deletar, visualizar',
        'Quando o espaço é limitado'
      ]}
      whenNotToUse={[
        'Para ações primárias importantes (use Button)',
        'Quando o ícone não for óbvio para todos',
        'Para ações que precisam de confirmação explícita',
        'Em formulários de submissão'
      ]}
    />
  );
}
