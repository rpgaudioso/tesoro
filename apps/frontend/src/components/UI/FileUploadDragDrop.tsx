import { File, Upload, X } from 'lucide-react';
import { DragEvent, useRef, useState } from 'react';
import styles from './FileUploadDragDrop.module.css';

export interface FileUploadDragDropProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // em bytes
  onFilesSelected?: (files: File[]) => void;
  disabled?: boolean;
}

export function FileUploadDragDrop({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB padrão
  onFilesSelected,
  disabled = false,
}: FileUploadDragDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]): { valid: File[]; error: string } => {
    const validFiles: File[] = [];
    let errorMsg = '';

    for (const file of files) {
      if (file.size > maxSize) {
        errorMsg = `Arquivo ${file.name} excede o tamanho máximo de ${formatFileSize(maxSize)}`;
        continue;
      }
      validFiles.push(file);
    }

    return { valid: validFiles, error: errorMsg };
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const { valid, error } = validateFiles(fileArray);
    
    setError(error);
    
    if (valid.length > 0) {
      setSelectedFiles(multiple ? [...selectedFiles, ...valid] : valid);
      onFilesSelected?.(valid);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${
          disabled ? styles.disabled : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Upload size={40} className={styles.uploadIcon} />
        <p className={styles.title}>
          {isDragging ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
        </p>
        <p className={styles.subtitle}>
          Tamanho máximo: {formatFileSize(maxSize)}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className={styles.hiddenInput}
          disabled={disabled}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {selectedFiles.length > 0 && (
        <div className={styles.fileList}>
          {selectedFiles.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <File size={16} />
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                className={styles.removeButton}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
