import { useState } from 'react';
import { ColorPicker } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function ColorPickerDetailPage() {
  const [color1, setColor1] = useState('#3B82F6');
  const [color2, setColor2] = useState('#10B981');

  const presetColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
  ];

  const whenToUse = [
    'Para customização de temas e cores',
    'Em configurações de categorias coloridas',
    'Para personalização visual de elementos',
    'Quando precisar de seleção de cor com presets',
  ];

  const whenNotToUse = [
    'Para seleção de itens não relacionados a cores',
    'Quando as opções de cor são fixas e limitadas (use badges coloridos)',
    'Para usuários que não entendem hexadecimal',
  ];

  return (
    <SimpleComponentPage
      title="ColorPicker"
      subtitle="Seletor de cores com presets"
      overview="ColorPicker permite escolher cores visualmente com picker nativo, input manual e paleta de presets."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <ColorPicker
              value={color1}
              onChange={setColor1}
              label="Cor da Categoria"
            />
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: color1,
              borderRadius: 'var(--radius-6)',
              color: 'white',
              textAlign: 'center',
              fontWeight: 500,
            }}>
              Preview: {color1}
            </div>
          </div>

          <div>
            <h3 className="section-title">Com Presets</h3>
            <ColorPicker
              value={color2}
              onChange={setColor2}
              label="Selecione uma cor"
              presetColors={presetColors}
            />
          </div>

          <div>
            <h3 className="section-title">Sem Label</h3>
            <ColorPicker
              value="#F59E0B"
              onChange={() => {}}
            />
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <ColorPicker
                value="#3B82F6"
                onChange={() => {}}
                size="small"
                label="Pequeno"
              />
              <ColorPicker
                value="#3B82F6"
                onChange={() => {}}
                size="medium"
                label="Médio (padrão)"
              />
              <ColorPicker
                value="#3B82F6"
                onChange={() => {}}
                size="large"
                label="Grande"
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Estados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Desabilitado</label>
                <ColorPicker
                  value="#10B981"
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Somente leitura</label>
                <ColorPicker
                  value="#10B981"
                  onChange={() => {}}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Aplicação em Categorias</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Alimentação', color: '#EF4444' },
                { name: 'Transporte', color: '#3B82F6' },
                { name: 'Lazer', color: '#8B5CF6' },
                { name: 'Saúde', color: '#10B981' },
              ].map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: 'var(--radius-4)',
                    backgroundColor: cat.color,
                    border: '2px solid var(--color-border-default)',
                  }} />
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      }
      installation="import { ColorPicker } from '@/components/UI';"
      basicExample={`const [color, setColor] = useState('#3B82F6');

<ColorPicker
  value={color}
  onChange={setColor}
  label="Cor da Categoria"
  presetColors={['#3B82F6', '#10B981', '#F59E0B']}
/>`}
      propsCode={`interface ColorPickerProps {
  value: string; // hexadecimal
  onChange: (color: string) => void;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  presetColors?: string[];
  showInput?: boolean;
}`}
      styleTokens="--spacing-12, --radius-6, --color-border-default"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
