import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import styles from './UploadInvoiceModal.module.css';

interface UploadInvoiceModalProps {
  cardId: string;
  onClose: () => void;
}

export default function UploadInvoiceModal({ cardId, onClose }: UploadInvoiceModalProps) {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();
  const [month, setMonth] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async ({ month, file }: { month: string; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('month', month);

      const { data } = await api.post(
        `/workspaces/${workspaceId}/credit-cards/${cardId}/invoices/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices', cardId] });
      toast.success('Fatura enviada com sucesso!');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao enviar fatura');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!month) {
      toast.error('Selecione o mês da fatura');
      return;
    }

    if (!file) {
      toast.error('Selecione um arquivo');
      return;
    }

    uploadMutation.mutate({ month, file });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validar tipo de arquivo (PDF, imagens, etc)
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Tipo de arquivo inválido. Use PDF ou imagens');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('Arquivo muito grande. Máximo 5MB');
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Enviar Fatura</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Mês da Fatura *"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />

          <div className={styles.fileInput}>
            <label htmlFor="file-upload" className={styles.fileLabel}>
              <Upload size={24} />
              <span>{file ? file.name : 'Selecionar arquivo'}</span>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
            </label>
            {file && (
              <p className={styles.fileInfo}>
                {(file.size / 1024).toFixed(2)} KB
              </p>
            )}
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={uploadMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? 'Enviando...' : 'Enviar Fatura'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
