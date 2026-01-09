import { Toggletip } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ToggletipDetailPage() {
  return (
    <SimpleComponentPage
      title="Toggletip"
      subtitle="Tooltip interativo com conteúdo clicável"
      overview="Toggletip é um tooltip que pode conter conteúdo interativo como links ou botões, diferente de tooltips comuns que desaparecem ao mover o mouse."
      usage={
        <>
          <div className="card">
            <h3 className="section-title">Posicionamento</h3>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Topo</span>
                <Toggletip align="top">
                  <p style={{ margin: 0 }}>Conteúdo do toggletip no topo</p>
                </Toggletip>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Base</span>
                <Toggletip align="bottom">
                  <p style={{ margin: 0 }}>Conteúdo do toggletip na base</p>
                </Toggletip>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Esquerda</span>
                <Toggletip align="left">
                  <p style={{ margin: 0 }}>Conteúdo do toggletip à esquerda</p>
                </Toggletip>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Direita</span>
                <Toggletip align="right">
                  <p style={{ margin: 0 }}>Conteúdo do toggletip à direita</p>
                </Toggletip>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="section-title">Com Conteúdo Interativo</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Ajuda interativa</span>
              <Toggletip>
                <p style={{ margin: 0, marginBottom: '8px' }}>
                  Este é um exemplo de toggletip com conteúdo interativo.
                </p>
                <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                  Saiba mais →
                </a>
              </Toggletip>
            </div>
          </div>
        </>
      }
      installation="import { Toggletip } from '@/components/UI';"
      basicExample={`<Toggletip align="top">
  <p>Conteúdo do toggletip</p>
  <a href="#">Link interativo</a>
</Toggletip>`}
      propsCode={`interface ToggletipProps {
  children: ReactNode;
  align?: 'top' | 'bottom' | 'left' | 'right';
}`}
      styleTokens={`min-width: 200px;
max-width: 300px;
padding: var(--spacing-12);
border: 1px solid var(--color-border);
border-radius: var(--radius-8);
box-shadow: var(--shadow-lg);
font-size: var(--font-sm);`}
      whenToUse={[
        'Para dicas que contêm links ou botões',
        'Para informações que o usuário pode querer copiar',
        'Para conteúdo de ajuda mais complexo',
      ]}
      whenNotToUse={[
        'Para dicas simples de texto (use Tooltip)',
        'Para informações extensas (use Modal)',
        'Para conteúdo não-interativo (use Tooltip)',
      ]}
    />
  );
}
