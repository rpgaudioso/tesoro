import { Carousel } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function CarouselDetailPage() {
  const slides = [
    {
      title: 'Bem-vindo ao Tesoro',
      description: 'Gerencie suas finanças de forma inteligente',
      image: '🏦',
    },
    {
      title: 'Controle Total',
      description: 'Acompanhe receitas e despesas em tempo real',
      image: '📊',
    },
    {
      title: 'Organização Simples',
      description: 'Categorize suas transações facilmente',
      image: '📁',
    },
  ];

  const whenToUse = [
    'Para exibir múltiplas imagens ou conteúdos relacionados',
    'Em galerias de fotos ou banners promocionais',
    'Para guias tutoriais passo-a-passo',
    'Quando precisar navegar entre conteúdos de forma linear',
  ];

  const whenNotToUse = [
    'Para navegação principal (use Tabs)',
    'Quando todos os itens devem ser visíveis simultaneamente',
    'Para conteúdo crítico que pode ser perdido',
  ];

  return (
    <SimpleComponentPage
      title="Carousel"
      subtitle="Carrossel de conteúdo"
      overview="Carousel exibe conteúdos navegáveis em sequência com controles de navegação e autoplay opcional."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <Carousel>
              {slides.map((slide, idx) => (
                <div key={idx} style={{
                  padding: '40px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-8)',
                  minHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{slide.image}</div>
                  <h3 style={{ marginBottom: '8px' }}>{slide.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{slide.description}</p>
                </div>
              ))}
            </Carousel>
          </div>

          <div>
            <h3 className="section-title">Com Autoplay</h3>
            <Carousel autoplay autoplayInterval={3000}>
              {['🎯', '🚀', '✨', '🎨'].map((emoji, idx) => (
                <div key={idx} style={{
                  padding: '60px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-8)',
                  fontSize: '64px',
                }}>
                  {emoji}
                </div>
              ))}
            </Carousel>
          </div>

          <div>
            <h3 className="section-title">Sem Loop</h3>
            <Carousel loop={false}>
              {slides.map((slide, idx) => (
                <div key={idx} style={{
                  padding: '40px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-8)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <h4>{slide.title}</h4>
                </div>
              ))}
            </Carousel>
          </div>

          <div>
            <h3 className="section-title">Com Indicadores</h3>
            <Carousel showIndicators>
              {['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'].map((text, idx) => (
                <div key={idx} style={{
                  padding: '80px',
                  textAlign: 'center',
                  backgroundColor: `hsl(${idx * 60}, 70%, 90%)`,
                  borderRadius: 'var(--radius-8)',
                  fontSize: '24px',
                  fontWeight: 500,
                }}>
                  {text}
                </div>
              ))}
            </Carousel>
          </div>

          <div>
            <h3 className="section-title">Galeria de Imágenes</h3>
            <Carousel showIndicators>
              {[
                { title: 'Dashboard', color: '#3B82F6' },
                { title: 'Transações', color: '#10B981' },
                { title: 'Relatórios', color: '#F59E0B' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '60px',
                  textAlign: 'center',
                  backgroundColor: item.color,
                  color: 'white',
                  borderRadius: 'var(--radius-8)',
                  fontSize: '20px',
                  fontWeight: 600,
                }}>
                  {item.title}
                </div>
              ))}
            </Carousel>
          </div>
        </>
      }
      installation="import { Carousel } from '@/components/UI';"
      basicExample={`<Carousel autoplay showIndicators>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}
      propsCode={`interface CarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number; // ms, padrão: 5000
  loop?: boolean; // padrão: true
  showIndicators?: boolean;
  showControls?: boolean; // padrão: true
  onChange?: (index: number) => void;
}`}
      styleTokens="--spacing-16, --radius-8, --color-bg-secondary, --shadow-md"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
