import { Database, File, Folder, Settings } from 'lucide-react';
import { TreeNode, TreeView } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function TreeViewDetailPage() {
  return (
    <SimpleComponentPage
      title="Tree View"
      subtitle="Visualização hierárquica expansível"
      overview="Tree View apresenta dados hierárquicos em uma estrutura de árvore expansível, ideal para navegação em estruturas aninhadas como pastas ou categorias."
      usage={
        <>
          <div>
            <h3 className="section-title">Estrutura de Pastas</h3>
            <TreeView>
              <TreeNode label="Documentos" icon={Folder} defaultExpanded>
                <TreeNode label="Trabalho" icon={Folder}>
                  <TreeNode label="relatorio.pdf" icon={File} onSelect={() => console.log('Selecionado: relatorio.pdf')} />
                  <TreeNode label="apresentacao.pptx" icon={File} onSelect={() => console.log('Selecionado: apresentacao.pptx')} />
                </TreeNode>
                <TreeNode label="Pessoal" icon={Folder}>
                  <TreeNode label="foto.jpg" icon={File} onSelect={() => console.log('Selecionado: foto.jpg')} />
                </TreeNode>
              </TreeNode>
              <TreeNode label="Downloads" icon={Folder}>
                <TreeNode label="arquivo.zip" icon={File} onSelect={() => console.log('Selecionado: arquivo.zip')} />
              </TreeNode>
            </TreeView>
          </div>
          <div>
            <h3 className="section-title">Configurações</h3>
            <TreeView>
              <TreeNode label="Sistema" icon={Settings} defaultExpanded>
                <TreeNode label="Geral" onSelect={() => console.log('Selecionado: Geral')} />
                <TreeNode label="Segurança" onSelect={() => console.log('Selecionado: Segurança')} />
                <TreeNode label="Privacidade" onSelect={() => console.log('Selecionado: Privacidade')} />
              </TreeNode>
              <TreeNode label="Base de Dados" icon={Database}>
                <TreeNode label="Conexões" onSelect={() => console.log('Selecionado: Conexões')} />
                <TreeNode label="Backup" onSelect={() => console.log('Selecionado: Backup')} />
              </TreeNode>
            </TreeView>
          </div>
        </>
      }
      installation="import { TreeView, TreeNode } from '@/components/UI';"
      basicExample={`<TreeView>
  <TreeNode label="Pasta 1" icon={Folder} defaultExpanded>
    <TreeNode label="Arquivo 1" icon={File} onSelect={() => {}} />
    <TreeNode label="Arquivo 2" icon={File} onSelect={() => {}} />
  </TreeNode>
  <TreeNode label="Pasta 2" icon={Folder}>
    <TreeNode label="Arquivo 3" icon={File} onSelect={() => {}} />
  </TreeNode>
</TreeView>`}
      propsCode={`interface TreeViewProps {
  children: ReactNode;
}

interface TreeNodeProps {
  label: string;
  icon?: LucideIcon;
  children?: ReactNode;
  defaultExpanded?: boolean;
  onSelect?: () => void;
}`}
      styleTokens={`padding: var(--spacing-8) var(--spacing-12);
border-radius: var(--radius-6);
font-size: var(--font-sm);
transition: background 0.2s;

/* Hover */
background: var(--color-bg-hover);`}
      whenToUse={[
        'Para estruturas de pastas e arquivos',
        'Para categorias aninhadas',
        'Para navegação hierárquica',
      ]}
      whenNotToUse={[
        'Para listas planas (use List ou ContainedList)',
        'Para dados tabulares (use DataTable)',
        'Para navegação principal (use Menu)',
      ]}
    />
  );
}
