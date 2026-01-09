import { useState } from 'react';
import { FileUploadDragDrop } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function FileUploadDragDropDetailPage() {
  const [files1, setFiles1] = useState<File[]>([]);
  const [files2, setFiles2] = useState<File[]>([]);

  const whenToUse = [
    'Para upload de múltiplos arquivos',
    'Quando arrastar e soltar melhora a experiência',
    'Para uploads de documentos, imagens ou faturas',
    'Quando precisar mostrar arquivos selecionados antes do envio',
  ];

  const whenNotToUse = [
    'Para upload único simples (use input[type=file])',
    'Quando o tamanho dos arquivos é muito grande',
    'Para uploads em background que não precisam de UI',
  ];

  return (
    <SimpleComponentPage
      title="FileUploadDragDrop"
      subtitle="Upload de arquivos com drag-and-drop"
      overview="FileUploadDragDrop facilita upload com arrastar e soltar, exibindo preview dos arquivos selecionados."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <FileUploadDragDrop
              files={files1}
              onFilesChange={setFiles1}
              accept=".pdf,.jpg,.png"
            />
            {files1.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Arquivos selecionados:</p>
                <ul style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  {files1.map((file, idx) => (
                    <li key={idx}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="section-title">Apenas Imagens</h3>
            <FileUploadDragDrop
              files={files2}
              onFilesChange={setFiles2}
              accept="image/*"
              maxSize={5 * 1024 * 1024} // 5MB
              hint="Apenas imagens (PNG, JPG) até 5MB"
            />
          </div>

          <div>
            <h3 className="section-title">Múltiplos Arquivos</h3>
            <FileUploadDragDrop
              files={[]}
              onFilesChange={() => {}}
              multiple
              maxFiles={5}
              hint="Arraste até 5 arquivos ou clique para selecionar"
            />
          </div>

          <div>
            <h3 className="section-title">Upload Único</h3>
            <FileUploadDragDrop
              files={[]}
              onFilesChange={() => {}}
              multiple={false}
              hint="Selecione apenas um arquivo"
            />
          </div>

          <div>
            <h3 className="section-title">Com Validação</h3>
            <FileUploadDragDrop
              files={[]}
              onFilesChange={() => {}}
              accept=".pdf"
              maxSize={2 * 1024 * 1024} // 2MB
              required
              error="É necessário enviar um arquivo PDF"
            />
          </div>

          <div>
            <h3 className="section-title">Estados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Desabilitado</label>
                <FileUploadDragDrop
                  files={[]}
                  onFilesChange={() => {}}
                  disabled
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Carregando</label>
                <FileUploadDragDrop
                  files={[]}
                  onFilesChange={() => {}}
                  loading
                  hint="Enviando arquivos..."
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Personalizado</h3>
            <FileUploadDragDrop
              files={[]}
              onFilesChange={() => {}}
              label="Upload de Faturas"
              accept=".pdf,.xml"
              hint="Arraste suas faturas em PDF ou XML"
              buttonText="Escolher Faturas"
            />
          </div>
        </>
      }
      installation="import { FileUploadDragDrop } from '@/components/UI';"
      basicExample={`const [files, setFiles] = useState<File[]>([]);

<FileUploadDragDrop
  files={files}
  onFilesChange={setFiles}
  accept=".pdf,.jpg,.png"
  maxSize={5 * 1024 * 1024}
/>`}
      propsCode={`interface FileUploadDragDropProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // em bytes
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  hint?: string;
  buttonText?: string;
}`}
      styleTokens="--spacing-16, --radius-8, --color-border-default, --color-primary"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
