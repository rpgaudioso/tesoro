import { AvatarGroup } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function AvatarGroupDetailPage() {
  const users = [
    { name: 'João Silva', photoUrl: undefined },
    { name: 'Maria Santos', photoUrl: undefined },
    { name: 'Pedro Costa', photoUrl: undefined },
    { name: 'Ana Oliveira', photoUrl: undefined },
  ];

  const manyUsers = [
    { name: 'Usuário 1' },
    { name: 'Usuário 2' },
    { name: 'Usuário 3' },
    { name: 'Usuário 4' },
    { name: 'Usuário 5' },
    { name: 'Usuário 6' },
    { name: 'Usuário 7' },
  ];

  const whenToUse = [
    'Para mostrar múltiplos usuários ou colaboradores',
    'Em listas de membros de projetos ou workspaces',
    'Para indicar participação em threads ou tarefas',
    'Quando o espaço é limitado mas precisa mostrar várias pessoas',
  ];

  const whenNotToUse = [
    'Para um único usuário (use Avatar simples)',
    'Quando precisar mostrar informações detalhadas de cada pessoa',
    'Para listas longas que exigem paginação',
  ];

  return (
    <SimpleComponentPage
      title="AvatarGroup"
      subtitle="Grupo de avatares sobrepostos"
      overview="AvatarGroup exibe múltiplos usuários de forma compacta com avatares sobrepostos e contador."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <AvatarGroup users={users} max={4} />
          </div>

          <div>
            <h3 className="section-title">Com Limite de Exibicião</h3>
            <AvatarGroup users={manyUsers} max={4} />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Exibindo 4 de {manyUsers.length} usuários
            </p>
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Pequeno</p>
                <AvatarGroup users={users} size="small" />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Médio (padrão)</p>
                <AvatarGroup users={users} size="medium" />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Grande</p>
                <AvatarGroup users={users} size="large" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Limite Personalizado</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Máx: 2</p>
                <AvatarGroup users={manyUsers} max={2} />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Máx: 3</p>
                <AvatarGroup users={manyUsers} max={3} />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Máx: 5</p>
                <AvatarGroup users={manyUsers} max={5} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Casos de Uso</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                padding: '12px 16px',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-6)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontWeight: 500, marginBottom: '4px' }}>Projeto Tesoro</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Workspace financeiro</p>
                </div>
                <AvatarGroup users={users} size="small" max={3} />
              </div>

              <div style={{
                padding: '12px 16px',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-6)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontWeight: 500, marginBottom: '4px' }}>Design System Review</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>7 participantes</p>
                </div>
                <AvatarGroup users={manyUsers} size="small" max={4} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Spacing entre Avatares</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Spacing padrão</p>
                <AvatarGroup users={users} />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Spacing compacto</p>
                <AvatarGroup users={users} spacing="compact" />
              </div>
            </div>
          </div>
        </>
      }
      installation="import { AvatarGroup } from '@/components/UI';"
      basicExample={`const users = [
  { name: 'João Silva', photoUrl: '/avatar1.jpg' },
  { name: 'Maria Santos', photoUrl: '/avatar2.jpg' },
  { name: 'Pedro Costa', photoUrl: '/avatar3.jpg' },
];

<AvatarGroup users={users} max={3} />`}
      propsCode={`interface AvatarGroupProps {
  users: Array<{
    name: string;
    photoUrl?: string;
  }>;
  max?: number; // máx visíveis antes do contador
  size?: 'small' | 'medium' | 'large';
  spacing?: 'default' | 'compact';
  onMoreClick?: () => void;
}`}
      styleTokens="--spacing-8, --radius-full, --color-bg-secondary, --color-text-primary"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
