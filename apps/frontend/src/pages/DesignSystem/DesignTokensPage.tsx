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
          
          <h3 className={styles.subsectionTitle}>Primary</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#FF5722' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-primary</strong>
                <span>#FF5722</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#E64A19' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-primary-hover</strong>
                <span>#E64A19</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: 'rgba(255, 87, 34, 0.1)' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-primary-light</strong>
                <span>rgba(255, 87, 34, 0.1)</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Semantic</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#4CAF50' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-success</strong>
                <span>#4CAF50</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#F44336' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-danger</strong>
                <span>#F44336</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#FF9800' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-warning</strong>
                <span>#FF9800</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Text</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#1F2937' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-text</strong>
                <span>#1F2937</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#6B7280' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-text-secondary</strong>
                <span>#6B7280</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#9CA3AF' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-text-tertiary</strong>
                <span>#9CA3AF</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subsectionTitle}>Background & Border</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-bg</strong>
                <span>#FFFFFF</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#F9FAFB' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-bg-secondary</strong>
                <span>#F9FAFB</span>
              </div>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.colorBox} style={{ background: '#E5E7EB' }}></div>
              <div className={styles.colorInfo}>
                <strong>--color-border</strong>
                <span>#E5E7EB</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <p className={styles.text}>
            Escala tipográfica consistente para hierarquia visual clara.
          </p>
          <CodeBlock
            code={`--font-xs: 12px
--font-sm: 14px
--font-base: 16px
--font-lg: 18px
--font-xl: 20px
--font-2xl: 24px
--font-3xl: 30px
--font-4xl: 36px

--font-normal: 400
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
            code={`--radius-4: 4px
--radius-6: 6px
--radius-8: 8px
--radius-12: 12px
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
            code={`--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)`}
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
