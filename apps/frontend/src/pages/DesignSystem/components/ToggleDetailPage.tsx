import { useState } from 'react';
import { Card, Toggle } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ToggleDetailPage() {
  const [enabled, setEnabled] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SimpleComponentPage
      title="Toggle"
      subtitle="Switch para ativar/desativar opções"
      overview="Toggle é um controle on/off usado para alternar configurações binárias, como notificações e preferências."
      usage={
        <Card>
          <h2>Exemplos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <Toggle checked={enabled} onChange={setEnabled} label="Modo escuro" />
            <Toggle checked={notifications} onChange={setNotifications} label="Notificações por email" />
            <Toggle checked={false} onChange={() => {}} label="Desabilitado" disabled />
          </div>
        </Card>
      }
      installation={`import { Toggle } from '@/components/UI';`}
      basicExample={`const [enabled, setEnabled] = useState(false);

<Toggle 
  checked={enabled} 
  onChange={setEnabled}
  label="Ativar recurso"
/>`}
      propsCode={`interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}`}
      styleTokens={`/* Switch */
width: 44px;
height: 24px;
border-radius: 12px;
background: var(--color-bg-tertiary);

/* Checked */
background: var(--color-primary);

/* Thumb */
width: 18px; height: 18px;
transform: translateX(20px) when checked;
transition: transform 0.2s;`}
    />
  );
}
