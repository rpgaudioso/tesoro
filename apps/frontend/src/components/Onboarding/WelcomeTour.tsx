import { useAuth } from '@/contexts/AuthContext';
import { createWorkspace } from '@/lib/settingsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Building2, CheckCircle, CreditCard, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styles from './WelcomeTour.module.css';

type Step = 'welcome' | 'workspace' | 'person' | 'account' | 'complete';

export default function WelcomeTour() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [workspaceName, setWorkspaceName] = useState('Minha Workspace');
  const [personName, setPersonName] = useState('');
  const [accountName, setAccountName] = useState('Conta Corrente');
  const [accountType, setAccountType] = useState('CHECKING');
  const [createdWorkspaceId, setCreatedWorkspaceId] = useState<string | null>(null);
  
  const { refreshWorkspaces, selectWorkspace } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createWorkspaceMutation = useMutation({
    mutationFn: (name: string) => createWorkspace({ name }),
    onSuccess: async (data) => {
      setCreatedWorkspaceId(data.data.id);
      await refreshWorkspaces();
      selectWorkspace(data.data.id);
      toast.success('Workspace criada!');
      setCurrentStep('person');
    },
    onError: () => {
      toast.error('Erro ao criar workspace');
    },
  });

  const createPersonMutation = useMutation({
    mutationFn: (data: { name: string; color: string }) =>
      fetch('/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'x-workspace-id': createdWorkspaceId!,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => {
      toast.success('Pessoa criada!');
      setCurrentStep('account');
    },
    onError: () => {
      toast.error('Erro ao criar pessoa');
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: (data: { name: string; type: string }) =>
      fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'x-workspace-id': createdWorkspaceId!,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => {
      toast.success('Conta criada!');
      queryClient.invalidateQueries();
      setCurrentStep('complete');
    },
    onError: () => {
      toast.error('Erro ao criar conta');
    },
  });

  const handleWorkspaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) {
      toast.error('Digite um nome para a workspace');
      return;
    }
    createWorkspaceMutation.mutate(workspaceName);
  };

  const handlePersonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim()) {
      toast.error('Digite um nome para a pessoa');
      return;
    }
    createPersonMutation.mutate({
      name: personName,
      color: '#3b82f6',
    });
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim()) {
      toast.error('Digite um nome para a conta');
      return;
    }
    createAccountMutation.mutate({
      name: accountName,
      type: accountType,
    });
  };

  const handleFinish = () => {
    navigate('/app/dashboard');
  };

  const steps = [
    { id: 'workspace', label: 'Workspace', icon: Building2 },
    { id: 'person', label: 'Pessoa', icon: User },
    { id: 'account', label: 'Conta', icon: CreditCard },
  ];

  const getStepIndex = (step: Step) => {
    if (step === 'welcome') return -1;
    if (step === 'complete') return 3;
    return steps.findIndex((s) => s.id === step);
  };

  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {currentStep !== 'welcome' && currentStep !== 'complete' && (
          <div className={styles.progress}>
            {steps.map((step, index) => (
              <div key={step.id} className={styles.progressStep}>
                <div
                  className={`${styles.progressIcon} ${
                    index < currentStepIndex
                      ? styles.progressComplete
                      : index === currentStepIndex
                      ? styles.progressActive
                      : styles.progressPending
                  }`}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                <span className={styles.progressLabel}>{step.label}</span>
                {index < steps.length - 1 && (
                  <div className={styles.progressLine} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.content}>
          {currentStep === 'welcome' && (
            <div className={styles.welcome}>
              <div className={styles.welcomeIcon}>👋</div>
              <h1>Bem-vindo ao Tesoro!</h1>
              <p className={styles.welcomeText}>
                Vamos configurar sua conta em 3 passos rápidos para você começar a gerenciar suas finanças.
              </p>
              <div className={styles.welcomeFeatures}>
                <div className={styles.feature}>
                  <Building2 className={styles.featureIcon} />
                  <div>
                    <h3>1. Crie sua Workspace</h3>
                    <p>Organize suas finanças em um único lugar</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <User className={styles.featureIcon} />
                  <div>
                    <h3>2. Adicione Pessoas</h3>
                    <p>Identifique transações pessoais ou compartilhadas</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <CreditCard className={styles.featureIcon} />
                  <div>
                    <h3>3. Configure Contas</h3>
                    <p>Adicione suas contas bancárias para controlar saldos</p>
                  </div>
                </div>
              </div>
              <button
                className={styles.primaryButton}
                onClick={() => setCurrentStep('workspace')}
              >
                Começar <ArrowRight size={20} />
              </button>
            </div>
          )}

          {currentStep === 'workspace' && (
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <Building2 size={32} />
              </div>
              <h2>Crie sua Workspace</h2>
              <p className={styles.stepDescription}>
                Uma workspace é onde você organiza todas as suas informações financeiras. 
                Você pode ter várias workspaces para separar finanças pessoais, familiares ou de negócios.
              </p>
              <form onSubmit={handleWorkspaceSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="workspaceName">Nome da Workspace</label>
                  <input
                    id="workspaceName"
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="Ex: Finanças Pessoais, Casa, Família..."
                    className={styles.input}
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={createWorkspaceMutation.isPending}
                >
                  {createWorkspaceMutation.isPending ? 'Criando...' : 'Continuar'}
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}

          {currentStep === 'person' && (
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <User size={32} />
              </div>
              <h2>Adicione uma Pessoa</h2>
              <p className={styles.stepDescription}>
                Pessoas ajudam a identificar quem fez cada transação. Útil para gastos compartilhados ou controle individual.
              </p>
              <form onSubmit={handlePersonSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="personName">Nome da Pessoa</label>
                  <input
                    id="personName"
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Ex: Pessoal, João, Maria..."
                    className={styles.input}
                    autoFocus
                  />
                  <span className={styles.hint}>
                    Você pode adicionar mais pessoas depois nas configurações
                  </span>
                </div>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={createPersonMutation.isPending}
                >
                  {createPersonMutation.isPending ? 'Criando...' : 'Continuar'}
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}

          {currentStep === 'account' && (
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <CreditCard size={32} />
              </div>
              <h2>Configure uma Conta</h2>
              <p className={styles.stepDescription}>
                Contas representam suas contas bancárias. Adicione-as para controlar seus saldos e importar extratos.
              </p>
              <form onSubmit={handleAccountSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="accountName">Nome da Conta</label>
                  <input
                    id="accountName"
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Ex: Conta Corrente, Poupança..."
                    className={styles.input}
                    autoFocus
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="accountType">Tipo de Conta</label>
                  <select
                    id="accountType"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className={styles.select}
                  >
                    <option value="CHECKING">Conta Corrente</option>
                    <option value="SAVINGS">Poupança</option>
                    <option value="INVESTMENT">Investimento</option>
                  </select>
                  <span className={styles.hint}>
                    Você pode adicionar mais contas depois nas configurações
                  </span>
                </div>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={createAccountMutation.isPending}
                >
                  {createAccountMutation.isPending ? 'Criando...' : 'Finalizar'}
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}

          {currentStep === 'complete' && (
            <div className={styles.complete}>
              <div className={styles.completeIcon}>🎉</div>
              <h2>Tudo Pronto!</h2>
              <p className={styles.completeText}>
                Sua conta está configurada e você já pode começar a usar o Tesoro.
              </p>
              <div className={styles.completeList}>
                <div className={styles.completeItem}>
                  <CheckCircle className={styles.completeCheck} />
                  <span>Workspace criada</span>
                </div>
                <div className={styles.completeItem}>
                  <CheckCircle className={styles.completeCheck} />
                  <span>Pessoa adicionada</span>
                </div>
                <div className={styles.completeItem}>
                  <CheckCircle className={styles.completeCheck} />
                  <span>Conta configurada</span>
                </div>
              </div>
              <p className={styles.nextSteps}>
                Próximos passos: adicione categorias, crie transações ou importe seus extratos bancários!
              </p>
              <button className={styles.primaryButton} onClick={handleFinish}>
                Ir para o Dashboard <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
