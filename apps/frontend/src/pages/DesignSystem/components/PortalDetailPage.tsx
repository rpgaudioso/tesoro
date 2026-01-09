import { useState } from 'react';
import { Button, Portal } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function PortalDetailPage() {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <SimpleComponentPage
      title="Portal"
      subtitle="Renderiza conteúdo fora da hierarquia do DOM"
      overview="Portal permite renderizar componentes em qualquer lugar do DOM, útil para modais e tooltips."
      usage={
        <div>
          <h3 className="section-title">Exemplo</h3>
          <Button onClick={() => setShowPortal(!showPortal)}>
            {showPortal ? 'Fechar' : 'Abrir'} Portal
          </Button>

          {showPortal && (
            <Portal>
              <div
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 9999,
                }}
              >
                <p>Conteúdo renderizado via Portal</p>
                <Button onClick={() => setShowPortal(false)}>Fechar</Button>
              </div>
            </Portal>
          )}
        </div>
      }
      installation={`import { Portal } from '@/components/UI';`}
      basicExample={`<Portal>
  <div className="overlay">
    Renderizado no body
  </div>
</Portal>`}
      propsCode={`interface PortalProps {
  children: ReactNode;
}`}
      styleTokens={`/* Renderiza no final do <body> */
/* Útil para modais, tooltips, dropdowns */

/* Exemplo de uso: */
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 9999;`}
    />
  );
}
