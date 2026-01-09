import { Stepper } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function StepperDetailPage() {
  const steps = [
    { label: 'Informações Pessoais', description: 'Dados básicos' },
    { label: 'Endereço', description: 'Localização' },
    { label: 'Pagamento', description: 'Forma de pagamento' },
    { label: 'Confirmação', description: 'Revisar dados' },
  ];

  const whenToUse = [
    'Para processos com múltiplas etapas sequenciais',
    'Em wizards e formulários divididos',
    'Quando precisar mostrar progresso em um fluxo',
    'Para orientar usuários através de tarefas complexas',
  ];

  const whenNotToUse = [
    'Para processos com menos de 3 etapas',
    'Quando as etapas não são sequenciais',
    'Para navegação não-linear (use Tabs)',
  ];

  return (
    <SimpleComponentPage
      title="Stepper"
      subtitle="Indicador de progresso multi-etapas"
      overview="Stepper mostra o progresso em processos sequenciais, ideal para wizards e formulários em múltiplas etapas."
      usage={
        <>
          <div>
            <h3 className="section-title">Etapa Inicial</h3>
            <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)' }}>
              <Stepper steps={steps} currentStep={0} />
            </div>
          </div>

          <div>
            <h3 className="section-title">Em Progresso</h3>
            <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)' }}>
              <Stepper steps={steps} currentStep={2} />
            </div>
          </div>

          <div>
            <h3 className="section-title">Concluído</h3>
            <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)' }}>
              <Stepper steps={steps} currentStep={4} />
            </div>
          </div>

          <div>
            <h3 className="section-title">Orientações</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)' }}>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Horizontal</p>
                <Stepper steps={steps} currentStep={1} orientation="horizontal" />
              </div>
              <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)' }}>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Vertical</p>
                <Stepper steps={steps} currentStep={1} orientation="vertical" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Sem Descrições</h3>
            <Stepper
              steps={[
                { label: 'Passo 1' },
                { label: 'Passo 2' },
                { label: 'Passo 3' },
              ]}
              currentStep={1}
            />
          </div>
        </>
      }
      installation="import { Stepper } from '@/components/UI';"
      basicExample={`const steps = [
  { label: 'Informações', description: 'Dados básicos' },
  { label: 'Endereço', description: 'Localização' },
  { label: 'Confirmação', description: 'Revisar' },
];

<Stepper steps={steps} currentStep={1} />`}
      propsCode={`interface StepperProps {
  steps: Array<{
    label: string;
    description?: string;
  }>;
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (step: number) => void;
}`}
      styleTokens="--spacing-12, --radius-8, --color-primary, --color-success"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
