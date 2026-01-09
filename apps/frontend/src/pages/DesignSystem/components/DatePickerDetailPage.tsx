import { useState } from 'react';
import { DatePicker } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function DatePickerDetailPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [startDate, setStartDate] = useState<Date | undefined>();

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  return (
    <SimpleComponentPage
      title="DatePicker"
      subtitle="Seletor de data para filtros e transações"
      overview="DatePicker é essencial para sistema financeiro, permitindo seleção de datas em filtros, criação de transações e relatórios."
      usage={
        <>
          <div>
            <h3 className="section-title">Data simples</h3>
            <DatePicker value={date} onChange={setDate} placeholder="Selecione a data" />
            {date && <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Selecionado: {date.toLocaleDateString('pt-BR')}
            </p>}
          </div>
          <div>
            <h3 className="section-title">Com restrição de período (próximos 30 dias)</h3>
            <DatePicker 
              value={startDate} 
              onChange={setStartDate} 
              minDate={today}
              maxDate={maxDate}
              placeholder="Selecione dentro do período"
            />
          </div>
          <div>
            <h3 className="section-title">Desabilitado</h3>
            <DatePicker value={undefined} onChange={() => {}} disabled placeholder="Campo desabilitado" />
          </div>
        </>
      }
      installation={`import { DatePicker } from '@/components/UI';`}
      basicExample={`const [date, setDate] = useState<Date>();

<DatePicker 
  value={date}
  onChange={setDate}
  minDate={new Date()}
  placeholder="Selecione a data"
/>`}
      propsCode={`interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}`}
      styleTokens={`/* Input */
padding: 10px 12px;
border: 1px solid var(--color-border);
border-radius: var(--radius-md);

/* Calendar */
position: absolute;
min-width: 280px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* Selected day */
background: var(--color-primary);
color: white;
font-weight: 600;`}
    />
  );
}
