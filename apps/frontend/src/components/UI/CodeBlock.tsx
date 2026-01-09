import { Code, Copy } from 'lucide-react';
import styles from './CodeBlock.module.css';
import { toast } from './Toast';

export interface CodeBlockProps {
  code?: string;
  children?: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, children, language = 'tsx', showLineNumbers = false }: CodeBlockProps) {
  const codeContent = code || children || '';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeContent);
    toast.success('Código copiado!');
  };

  const lines = codeContent.split('\n');

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <div className={styles.codeLanguage}>
          <Code size={14} />
          {language}
        </div>
        <button
          className={styles.copyButton}
          onClick={copyToClipboard}
          title="Copiar código"
          type="button"
        >
          <Copy size={14} />
          Copiar
        </button>
      </div>
      <pre className={styles.codeContent}>
        {showLineNumbers ? (
          <code>
            {lines.map((line, index) => (
              <div key={index} className={styles.codeLine}>
                <span className={styles.lineNumber}>{index + 1}</span>
                <span className={styles.lineContent}>{line}</span>
              </div>
            ))}
          </code>
        ) : (
          <code>{codeContent}</code>
        )}
      </pre>
    </div>
  );
}
