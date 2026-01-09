import { ExternalLink } from 'lucide-react';
import { Link } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function LinkDetailPage() {
  return (
    <SimpleComponentPage
      title="Link"
      subtitle="Link estilizado e acessível"
      overview="Link é um componente de navegação que suporta tanto links externos quanto navegação interna com React Router."
      usage={
        <>
          <div>
            <h3 className="section-title">Variantes</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link variant="primary" href="#">Link Primário</Link>
              <Link variant="secondary" href="#">Link Secundário</Link>
              <Link variant="inline" href="#">Link Inline</Link>
            </div>
          </div>
          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link size="sm" href="#">Pequeno</Link>
              <Link size="md" href="#">Médio</Link>
              <Link size="lg" href="#">Grande</Link>
            </div>
          </div>
          <div>
            <h3 className="section-title">Com Ícone</h3>
            <Link href="https://github.com" target="_blank">
              Ver no GitHub <ExternalLink size={14} />
            </Link>
          </div>
          <div>
            <h3 className="section-title">Desabilitado</h3>
            <Link disabled href="#">Link Desabilitado</Link>
          </div>
        </>
      }
      installation={`import { Link } from '@/components/UI';`}
      basicExample={`// Link externo
<Link href="https://example.com" target="_blank">
  Link Externo
</Link>

// Link interno (React Router)
<Link to="/dashboard">
  Dashboard
</Link>

// Com ícone
<Link href="#">
  Ajuda <HelpCircle size={14} />
</Link>`}
      propsCode={`interface LinkProps {
  href?: string;          // Link externo
  to?: string;            // React Router
  variant?: 'primary' | 'secondary' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}`}
      styleTokens={`font-weight: var(--font-medium);
border-radius: var(--radius-6);
transition: all 0.2s;

/* Primary variant */
color: var(--color-primary);

/* Focus state */
box-shadow: 0 0 0 3px var(--color-primary-light);`}
      whenToUse={[
        'Para navegação entre páginas',
        'Para links externos (documentação, help)',
        'Para links inline em textos e parágrafos',
        'Em listas de navegação e menus'
      ]}
      whenNotToUse={[
        'Para ações que modificam dados (use Button)',
        'Para submeter formulários (use Button type="submit")',
        'Para ações destrutivas como excluir (use Button variant="danger")'
      ]}
    />
  );
}
