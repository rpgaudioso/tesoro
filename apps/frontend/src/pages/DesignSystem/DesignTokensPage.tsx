import { Card, CodeBlock, PageHeader } from '../../components/UI';
import styles from './DesignTokensPage.module.css';

export default function DesignTokensPage() {
  return (
    <div className={styles.container}>
      <PageHeader
        title="Design Tokens"
        subtitle="Variáveis CSS que definem o sistema de design"
      />

      <Card>
        <p className={styles.intro}>
          Design Tokens são as decisões de design fundamentais do sistema, 
          representadas como variáveis CSS. Elas garantem consistência visual 
          em toda a aplicação e facilitam a manutenção e evolução do design.
        </p>
      </Card>

      <div className={styles.sections}>
        <Card>
          <h2 className={styles.sectionTitle}>Spacing</h2>
          <p className={styles.text}>
            Sistema de espaçamento baseado em múltiplos de 4px para consistência visual.
          </p>
          <CodeBlock
            code={`--spacing-4: 4px
--spacing-6: 6px
--spacing-8: 8px
--spacing-10: 10px
--spacing-12: 12px
--spacing-16: 16px
--spacing-20: 20px
--spacing-24: 24px
--spacing-32: 32px
--spacing-40: 40px
--spacing-48: 48px
--spacing-64: 64px`}
            language="css"
          />
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Colors</h2>
          <p className={styles.text}>
            Paleta de cores semânticas para uso consistente em toda a aplicação.
          </p>
          
          <h3 className={styles.subsectionTitle}>Primary (Orange Theme)</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#FF5722' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-primary</strong>
                <span>#FF5722</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#F4511E' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-primary-hover</strong>
                <span>#F4511E</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#FFEBE6' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-primary-light</strong>
                <span>#FFEBE6</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#E64A19' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-primary-dark</strong>
                <span>#E64A19</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Semantic Colors</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#10b981' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-success</strong>
                <span>#10b981</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#d1fae5' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-success-light</strong>
                <span>#d1fae5</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#3b82f6' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-info</strong>
                <span>#3b82f6</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#dbeafe' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-info-light</strong>
                <span>#dbeafe</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#f59e0b' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-warning</strong>
                <span>#f59e0b</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#fef3c7' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-warning-light</strong>
                <span>#fef3c7</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#ef4444' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-danger</strong>
                <span>#ef4444</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#dc2626' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-danger-hover</strong>
                <span>#dc2626</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#fee2e2' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-danger-light</strong>
                <span>#fee2e2</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Overlay Colors</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: 'rgba(0, 0, 0, 0.6)' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-overlay</strong>
                <span>rgba(0, 0, 0, 0.6)</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: 'rgba(0, 0, 0, 0.5)' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-overlay-light</strong>
                <span>rgba(0, 0, 0, 0.5)</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Neutral Colors</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#fafafa' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-50</strong>
                <span>#fafafa</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#f5f5f5' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-100</strong>
                <span>#f5f5f5</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#e5e5e5' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-200</strong>
                <span>#e5e5e5</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#d4d4d4' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-300</strong>
                <span>#d4d4d4</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#a3a3a3' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-400</strong>
                <span>#a3a3a3</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#737373' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-500</strong>
                <span>#737373</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#525252' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-600</strong>
                <span>#525252</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#404040' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-700</strong>
                <span>#404040</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#262626' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-800</strong>
                <span>#262626</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#171717' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-neutral-900</strong>
                <span>#171717</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Text Colors</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#171717' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-text-primary</strong>
                <span>#171717</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#262626' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-text</strong>
                <span>#262626</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#737373' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-text-secondary</strong>
                <span>#737373</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#a3a3a3' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-text-tertiary</strong>
                <span>#a3a3a3</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Background & Border</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#ffffff', border: '1px solid #e5e5e5' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-bg</strong>
                <span>#ffffff</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#fafafa' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-bg-secondary</strong>
                <span>#fafafa</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#f5f5f5' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-bg-tertiary</strong>
                <span>#f5f5f5</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#e5e5e5' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-border</strong>
                <span>#e5e5e5</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#f0f0f0' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-border-light</strong>
                <span>#f0f0f0</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Chart Colors</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#FF5722' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-chart-1</strong>
                <span>#FF5722</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#FFA726' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-chart-2</strong>
                <span>#FFA726</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#66BB6A' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-chart-3</strong>
                <span>#66BB6A</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#42A5F5' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-chart-4</strong>
                <span>#42A5F5</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#AB47BC' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-chart-5</strong>
                <span>#AB47BC</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#26C6DA' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-chart-6</strong>
                <span>#26C6DA</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <p className={styles.text}>
            Escala tipográfica consistente para hierarquia visual clara.
          </p>
          
          <h3 className={styles.subsectionTitle}>Font Sizes</h3>
          <CodeBlock
            code={`--font-xs: 12px
--font-sm: 14px
--font-base: 15px
--font-md: 16px
--font-lg: 18px
--font-xl: 20px
--font-2xl: 24px
--font-3xl: 30px
--font-4xl: 36px`}
            language="css"
          />

          <h3 className={styles.subsectionTitle}>Font Weights</h3>
          <CodeBlock
            code={`--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700`}
            language="css"
          />
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Border Radius</h2>
          <p className={styles.text}>
            Valores de arredondamento para criar interfaces coesas.
          </p>
          <CodeBlock
            code={`--radius-6: 6px
--radius-8: 8px
--radius-12: 12px
--radius-16: 16px
--radius-20: 20px
--radius-24: 24px
--radius-full: 9999px`}
            language="css"
          />
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Shadows</h2>
          <p className={styles.text}>
            Elevações sutis para criar profundidade e hierarquia.
          </p>
          <CodeBlock
            code={`--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.03)
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.04)
--shadow: 0 2px 6px 0 rgb(0 0 0 / 0.06)
--shadow-md: 0 4px 12px 0 rgb(0 0 0 / 0.08)
--shadow-lg: 0 8px 24px 0 rgb(0 0 0 / 0.12)
--shadow-xl: 0 12px 32px 0 rgb(0 0 0 / 0.16)`}
            language="css"
          />
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Drawer & Modal Dimensions</h2>
          <p className={styles.text}>
            Tamanhos predefinidos para drawers e modais.
          </p>
          
          <h3 className={styles.subsectionTitle}>Drawer</h3>
          <CodeBlock
            code={`/* Widths (left/right) */
--drawer-width-sm: 320px
--drawer-width-md: 480px
--drawer-width-lg: 640px

/* Heights (top/bottom) */
--drawer-height-sm: 240px
--drawer-height-md: 360px
--drawer-height-lg: 480px`}
            language="css"
          />

          <h3 className={styles.subsectionTitle}>Modal</h3>
          <CodeBlock
            code={`--modal-width-sm: 400px
--modal-width-md: 600px
--modal-width-lg: 800px
--modal-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 
                0 10px 20px rgba(0, 0, 0, 0.1), 
                0 20px 40px rgba(0, 0, 0, 0.15)`}
            language="css"
          />
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Como usar</h2>
          <p className={styles.text}>
            Tokens CSS podem ser usados diretamente em CSS Modules ou inline styles:
          </p>
          <CodeBlock
            code={`/* Em CSS Modules */
.myComponent {
  padding: var(--spacing-16);
  background: var(--color-bg);
  border-radius: var(--radius-8);
  box-shadow: var(--shadow-sm);
  color: var(--color-text);
  font-size: var(--font-base);
}

/* Em inline styles (evitar quando possível) */
<div style={{ 
  padding: 'var(--spacing-16)',
  color: 'var(--color-text)' 
}}>
  Content
</div>`}
            language="tsx"
          />
        </Card>
      </div>
    </div>
  );
}
