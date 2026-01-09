import { useState } from 'react';
import { DateRangePicker } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function DateRangePickerDetailPage() {
  const [range1, setRange1] = useState({ start: '', end: '' });
  const [range2, setRange2] = useState({ start: '2026-01-01', end: '2026-01-15' });

  const whenToUse = [
    'Para selecionar períodos de tempo (início e fim)',
    'Em filtros de relatórios e dashboards',
    'Para agendar eventos com duração',
    'Quando precisar de validação de intervalos de datas',
  ];

  const whenNotToUse = [
    'Para selecionar apenas uma data (use DatePicker)',
    'Para períodos complexos com múltiplos intervalos',
    'Quando a data é secundária na interface',
  ];

  return (
    <SimpleComponentPage
      title="DateRangePicker"
      subtitle="Seletor de intervalo de datas"
      overview="DateRangePicker permite selecionar um período com data inicial e final, ideal para filtros de relatórios e agendamentos."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)' }}>
              <DateRangePicker
                startDate={range1.start}
                endDate={range1.end}
                onStartDateChange={(date) => setRange1({ ...range1, start: date })}
                onEndDateChange={(date) => setRange1({ ...range1, end: date })}
              />
            </div>
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Selecionado: {range1.start || '(início)'} até {range1.end || '(fim)'}
            </p>
          </div>

          <div>
            <h3 className="section-title">Com Valores Pré-definidos</h3>
            <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)' }}>
              <DateRangePicker
                startDate={range2.start}
                endDate={range2.end}
                onStartDateChange={(date) => setRange2({ ...range2, start: date })}
                onEndDateChange={(date) => setRange2({ ...range2, end: date })}
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Estados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Desabilitado</label>
                <DateRangePicker
                  startDate="2026-01-01"
                  endDate="2026-01-31"
                  onStartDateChange={() => {}}
                  onEndDateChange={() => {}}
                  disabled
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Somente leitura</label>
                <DateRangePicker
                  startDate="2026-01-01"
                  endDate="2026-01-31"
                  onStartDateChange={() => {}}
                  onEndDateChange={() => {}}
                  readOnly
                />
              </div>
            </div>
          </div>
        </>
      }
      installation="import { DateRangePicker } from '@/components/UI';"
      basicExample={`const [range, setRange] = useState({ start: '', end: '' });

<DateRangePicker
  startDate={range.start}
  endDate={range.end}
  onStartDateChange={(date) => setRange({ ...range, start: date })}
  onEndDateChange={(date) => setRange({ ...range, end: date })}
/>`}
      propsCode={`interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: string;
  maxDate?: string;
}`}
      styleTokens="--spacing-12, --radius-6, --color-border-default"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
