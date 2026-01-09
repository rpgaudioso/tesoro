import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

export interface CarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
}

export function Carousel({
  children,
  autoplay = false,
  interval = 5000,
  showIndicators = true,
  showControls = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (autoplay) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prev) => (prev + 1) % children.length),
        interval
      );

      return () => {
        resetTimeout();
      };
    }
  }, [currentIndex, autoplay, interval, children.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer}>
        <div
          className={styles.slides}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className={styles.slide}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {showControls && children.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className={`${styles.control} ${styles.controlPrev}`}
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className={`${styles.control} ${styles.controlNext}`}
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {showIndicators && children.length > 1 && (
        <div className={styles.indicators}>
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.indicatorActive : ''
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
