import { AILabel } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function AILabelDetailPage() {
  return (
    <SimpleComponentPage
      title="AI Label"
      subtitle="Label para indicar features com inteligência artificial"
      overview="AI Label é um componente visual que identifica funcionalidades que utilizam inteligência artificial, ajudando usuários a reconhecer recursos assistidos por IA."
      usage={
        <>
          <div className="card">
            <h3 className="section-title">Variantes</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <AILabel />
              <AILabel text="IA" />
              <AILabel text="Assistente" />
            </div>
          </div>
          <div className="card">
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <AILabel size="sm" />
              <AILabel size="md" />
              <AILabel size="lg" />
            </div>
          </div>
        </>
      }
      installation="import { AILabel } from '@/components/UI';"
      basicExample={`<AILabel />
<AILabel text="IA" />
<AILabel text="Assistente" size="lg" />
<AILabel text="Beta" variant="inline" />`}
      propsCode={`interface AILabelProps {
  text?: string;          // Texto do label (padrão: "AI")
  size?: 'sm' | 'md' | 'lg';  // Tamanho
  variant?: 'default' | 'inline';  // Estilo
}`}
      styleTokens={`padding: var(--spacing-2) var(--spacing-8);
border-radius: var(--radius-full);
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
font-size: var(--font-xs);
font-weight: var(--font-semibold);`}
      whenToUse={[
        'Para identificar features experimentais com IA',
        'Para destacar sugestões geradas por IA',
        'Para indicar assistentes virtuais ou chatbots',
      ]}
      whenNotToUse={[
        'Para badges de status (use Badge)',
        'Para tags de categorização (use Tag)',
        'Para indicadores genéricos (use Badge)',
      ]}
    />
  );
}
