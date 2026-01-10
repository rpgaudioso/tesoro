import { Skeleton, SkeletonGroup } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function SkeletonDetailPage() {
  const whenToUse = [
    'Durante o carregamento de conteúdo para melhorar a percepção de performance',
    'Para indicar que dados estão sendo carregados',
    'Quando o tempo de carregamento é previsível',
    'Para manter o layout estável enquanto conteúdo carrega',
  ];

  const whenNotToUse = [
    'Para carregamentos muito rápidos (< 300ms)',
    'Quando o tamanho do conteúdo é desconhecido',
    'Para processos que podem falhar (use Loading ou Spinner)',
  ];

  return (
    <SimpleComponentPage
      title="Skeleton"
      subtitle="Placeholder animado para carregamento"
      overview="Skeleton é um componente que simula a estrutura de conteúdo durante o carregamento, melhorando a percepção de performance e mantendo a estabilidade do layout. Ele cria uma expectativa visual do que está por vir."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Prático: Carregando Perfil de Usuário</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Veja como o Skeleton simula a estrutura de um cartão de perfil durante o carregamento:
            </p>
            <div style={{ padding: '20px', background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-8)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Skeleton variant="circular" width={60} height={60} />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Exemplo Prático: Carregando Lista de Transações</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Skeleton em lista mantendo o layout previsível:
            </p>
            <div style={{ padding: '20px', background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-8)' }}>
              <SkeletonGroup count={4} spacing="16px" />
            </div>
          </div>

          <div>
            <h3 className="section-title">Variantes de Forma</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Diferentes formas para simular diferentes tipos de conteúdo:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Text (para linhas de texto)</p>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </div>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Circular (para avatares)</p>
                <Skeleton variant="circular" width={48} height={48} />
              </div>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Rectangular (para imagens/banners)</p>
                <Skeleton variant="rectangular" width="100%" height={120} />
              </div>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Rounded (para cards)</p>
                <Skeleton variant="rounded" width="100%" height={100} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Tipos de Animação</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Escolha a animação que melhor se adequa ao contexto:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Pulse (padrão - suave e discreto)</p>
                <Skeleton animation="pulse" width="80%" height={20} />
              </div>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Wave (dinâmico - indica processamento)</p>
                <Skeleton animation="wave" width="80%" height={20} />
              </div>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>None (sem animação)</p>
                <Skeleton animation="none" width="80%" height={20} />
              </div>
            </div>
          </div>
        </>
      }
      installation="import { Skeleton, SkeletonGroup } from '@/components/UI';"
      basicExample={`<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rectangular" width="100%" height={120} />`}
      props={[
        {
          name: 'variant',
          type: '"text" | "circular" | "rectangular" | "rounded"',
          defaultValue: '"text"',
          description: 'Define a forma do skeleton',
        },
        {
          name: 'animation',
          type: '"pulse" | "wave" | "none"',
          defaultValue: '"pulse"',
          description: 'Tipo de animação do skeleton',
        },
        {
          name: 'width',
          type: 'number | string',
          defaultValue: '—',
          description: 'Largura do skeleton (px ou string com unidade)',
        },
        {
          name: 'height',
          type: 'number | string',
          defaultValue: '—',
          description: 'Altura do skeleton (px ou string com unidade)',
        },
      ]}
      designTokens={[
        { token: '--color-neutral-200', usage: 'Cor de fundo do skeleton' },
        { token: '--radius-6', usage: 'Border radius do skeleton' },
      ]}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
