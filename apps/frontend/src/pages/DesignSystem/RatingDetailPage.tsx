import { useState } from 'react';
import { Rating } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function RatingDetailPage() {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(3.5);

  const whenToUse = [
    'Para coletar avaliações e feedback de usuários',
    'Para exibir classificações de itens',
    'Em sistemas de review e comentários',
    'Quando precisar de uma escala visual de 1-5',
  ];

  const whenNotToUse = [
    'Para escalas diferentes de estrelas',
    'Quando precisar de granularidade maior que 0.5',
    'Para avaliações binárias (use Toggle ou Checkbox)',
  ];

  return (
    <SimpleComponentPage
      title="Rating"
      subtitle="Avaliação com estrelas"
      overview="Rating permite avaliar itens com estrelas de forma visual e intuitiva, ideal para sistemas de feedback e avaliação."
      usage={
        <>
          <div>
            <h3 className="section-title">Interativo</h3>
            <Rating value={rating1} onChange={setRating1} />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Avaliação: {rating1} estrelas
            </p>
          </div>

          <div>
            <h3 className="section-title">Com Meio Estrela</h3>
            <Rating value={rating2} onChange={setRating2} allowHalf />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Avaliação: {rating2} estrelas
            </p>
          </div>

          <div>
            <h3 className="section-title">Somente Leitura</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rating value={5} readOnly />
                <span style={{ fontSize: '14px' }}>Excelente</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rating value={4} readOnly />
                <span style={{ fontSize: '14px' }}>Muito Bom</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rating value={3} readOnly />
                <span style={{ fontSize: '14px' }}>Bom</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rating value={2} readOnly />
                <span style={{ fontSize: '14px' }}>Regular</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rating value={1} readOnly />
                <span style={{ fontSize: '14px' }}>Ruim</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Pequeno</p>
                <Rating value={4} size="small" readOnly />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Médio (padrão)</p>
                <Rating value={4} readOnly />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Grande</p>
                <Rating value={4} size="large" readOnly />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Desabilitado</h3>
            <Rating value={3} disabled />
          </div>
        </>
      }
      installation="import { Rating } from '@/components/UI';"
      basicExample={`const [rating, setRating] = useState(0);

<Rating value={rating} onChange={setRating} />`}
      propsCode={`interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number; // padrão: 5
  size?: 'small' | 'medium' | 'large';
  allowHalf?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}`}
      styleTokens="--spacing-8, --radius-6, --color-warning, --color-text-tertiary"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
