import { Card, CodeBlock } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function CodeBlockDetailPage() {
  return (
    <SimpleComponentPage
      title="CodeBlock"
      subtitle="Bloco de código com sintaxe destacada"
      overview="CodeBlock exibe código formatado com monospace e background diferenciado para fácil leitura."
      usage={
        <Card>
          <h2>Exemplo</h2>
          <div style={{ marginTop: '16px' }}>
            <CodeBlock language="tsx">
              {`import { Button } from '@/components/UI';

export default function App() {
  return (
    <Button variant="primary">
      Clique aqui
    </Button>
  );
}`}
            </CodeBlock>
          </div>
        </Card>
      }
      installation={`import { CodeBlock } from '@/components/UI';`}
      basicExample={`<CodeBlock language="tsx">
  {\`const value = 10;\`}
</CodeBlock>`}
      propsCode={`interface CodeBlockProps {
  children: string;
  language?: string;
}`}
      styleTokens={`font-family: 'Fira Code', 'Consolas', monospace;
background: var(--color-bg-secondary);
border-radius: var(--radius-8);
padding: var(--spacing-16);
overflow-x: auto;
font-size: var(--font-sm);
line-height: 1.6;`}
    />
  );
}
