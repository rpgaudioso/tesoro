import { CheckCircle, CreditCard, User } from 'lucide-react';
import { useState } from 'react';
import { Button, ProgressIndicator } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ProgressIndicatorDetailPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: 'Dados Pessoais', description: 'Informações básicas', icon: <User size={14} /> },
    { label: 'Pagamento', description: 'Método de pagamento', icon: <CreditCard size={14} /> },
    { label: 'Confirmação', description: 'Revisão final', icon: <CheckCircle size={14} /> },
  ];

  return (
    <SimpleComponentPage
      title="ProgressIndicator"
      subtitle="Indicador de progresso (Wizard/Stepper)"
      overview="ProgressIndicator mostra o progresso do usuário através de um processo multi-etapa, como onboarding ou formulários complexos."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Interativo</h3>
            <ProgressIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={(step) => step < currentStep && setCurrentStep(step)}
            />
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <Button
                variant="secondary"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Anterior
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
              >
                Próximo
              </Button>
            </div>
          </div>
          <div>
            <h3 className="section-title">Orientação Vertical</h3>
            <ProgressIndicator
              steps={[
                { label: 'Criar Conta', description: 'Configure sua conta' },
                { label: 'Adicionar Workspace', description: 'Configure seu espaço de trabalho' },
                { label: 'Convidar Membros', description: 'Adicione sua equipe' },
                { label: 'Começar', description: 'Tudo pronto!' },
              ]}
              currentStep={2}
              orientation="vertical"
            />
          </div>
        </>
      }
      installation={`import { ProgressIndicator } from '@/components/UI';`}
      basicExample={`const steps = [
  { label: 'Passo 1', description: 'Descrição 1' },
  { label: 'Passo 2', description: 'Descrição 2' },
  { label: 'Passo 3', description: 'Descrição 3' },
];

<ProgressIndicator
  steps={steps}
  currentStep={1}
  orientation="horizontal"
  onStepClick={(step) => console.log(step)}
/>`}
      propsCode={`interface ProgressStep {
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (step: number) => void;
}`}
      styleTokens={`/* Circle */
width: 32px;
height: 32px;
border-radius: var(--radius-full);
border: 2px solid var(--color-border);

/* Current/Complete */
border-color: var(--color-primary);
background: var(--color-primary);
color: white;

/* Line */
background: var(--color-border);
/* Complete: */ background: var(--color-primary);`}
      whenToUse={[
        'Para processos multi-etapa (onboarding, checkout)',
        'Para formulários longos divididos em seções',
        'Para assistentes e wizards',
        'Quando o usuário precisa saber em qual etapa está'
      ]}
      whenNotToUse={[
        'Para navegação entre seções independentes (use Tabs)',
        'Para processos lineares sem etapas claras (use ProgressBar)',
        'Para indicar carregamento simples (use Loading)'
      ]}
    />
  );
}
