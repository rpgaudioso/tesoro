import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './DateRangePicker.module.css';

export interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: string;
  maxDate?: string;
  label?: string;
  hint?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  disabled,
  readOnly,
  minDate,
  maxDate,
  label,
  hint,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [viewDate, setViewDate] = useState(startDate ? new Date(startDate) : new Date());
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (disabled || readOnly) return;
    
    const dateStr = date.toISOString().split('T')[0];
    
    if (selecting === 'start') {
      onStartDateChange(dateStr);
      setSelecting('end');
    } else {
      onEndDateChange(dateStr);
      setSelecting('start');
      setIsOpen(false);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return date >= start && date <= end;
  };

  const isDateSelected = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === startDate || dateStr === endDate;
  };

  const previousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const displayValue = startDate && endDate 
    ? `${formatDate(startDate)} - ${formatDate(endDate)}` 
    : startDate 
    ? `${formatDate(startDate)} - ...` 
    : 'Selecione um período';

  const days = getDaysInMonth(viewDate);
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className={styles.container} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      
      <button
        type="button"
        className={`${styles.trigger} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <Calendar size={16} className={styles.icon} />
        <span className={startDate ? styles.value : styles.placeholder}>
          {displayValue}
        </span>
      </button>

      {isOpen && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.navButton}
              onClick={previousMonth}
            >
              <ChevronLeft size={16} />
            </button>
            <span className={styles.monthYear}>
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              type="button"
              className={styles.navButton}
              onClick={nextMonth}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className={styles.weekDays}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className={`${styles.day} ${styles.empty}`} />;
              }

              const isSelected = isDateSelected(date);
              const isInRange = isDateInRange(date);

              return (
                <button
                  key={index}
                  type="button"
                  className={`${styles.day} ${
                    isSelected ? styles.selected : isInRange ? styles.inRange : ''
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  );
}
