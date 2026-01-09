import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Selecione uma data',
  minDate,
  maxDate,
  disabled,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Adiciona dias vazios do início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Adiciona os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const handleSelectDate = (date: Date) => {
    if (isDateDisabled(date)) return;
    onChange(date);
    setIsOpen(false);
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date | undefined, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`${styles.input} ${disabled ? styles.disabled : ''}`}
      >
        <Calendar size={18} className={styles.icon} />
        <span className={value ? styles.value : styles.placeholder}>
          {value ? formatDate(value) : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button
              type="button"
              onClick={handlePrevMonth}
              className={styles.navButton}
              aria-label="Mês anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <span className={styles.monthYear}>
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className={styles.navButton}
              aria-label="Próximo mês"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map((day) => (
              <div key={day} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {getDaysInMonth(viewDate).map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => day && handleSelectDate(day)}
                disabled={!day || isDateDisabled(day)}
                className={`${styles.day} ${
                  day && isSameDay(value, day) ? styles.selected : ''
                } ${!day ? styles.empty : ''} ${
                  day && isDateDisabled(day) ? styles.disabledDay : ''
                }`}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
