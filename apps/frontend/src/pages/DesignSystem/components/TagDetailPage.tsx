import { useState } from 'react';
import { Tag } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function TagDetailPage() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Vite']);

  const handleRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <SimpleComponentPage
      title="Tag"
      subtitle="Labels removíveis para categorias e filtros"
      overview="Tags são usadas para mostrar filtros ativos, categorias múltiplas e labels que podem ser removidas."
      usage={
        <>
          <div>
            <h3 className="section-title">Variantes</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Tag variant="default">Default</Tag>
              <Tag variant="primary">Primary</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="warning">Warning</Tag>
              <Tag variant="danger">Danger</Tag>
            </div>
          </div>
          <div>
            <h3 className="section-title">Removíveis</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {tags.map((tag, index) => (
                <Tag key={index} onRemove={() => handleRemove(index)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </>
      }
      installation={`import { Tag } from '@/components/UI';`}
      basicExample={`<Tag 
  variant="primary" 
  onRemove={() => console.log('removed')}
>
  Label
</Tag>`}
      propsCode={`interface TagProps {
  children: string;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}`}
      styleTokens={`padding: 4px 10px;
border-radius: 16px;
font-size: 13px;
font-weight: 500;

/* Primary */
background: var(--color-primary-light);
color: var(--color-primary);`}
      whenToUse={[
        'Para mostrar filtros ativos',
        'Com categorias múltiplas selecionadas',
        'Para keywords e labels removíveis',
        'Em chips de seleção múltipla'
      ]}
      whenNotToUse={[
        'Para status fixos (use Badge)',
        'Para navegação (use Breadcrumb)',
        'Quando não for removível (use Badge)',
        'Para botões de ação (use Button)'
      ]}
    />
  );
}
