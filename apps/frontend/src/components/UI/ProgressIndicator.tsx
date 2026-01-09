import { Check } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './ProgressIndicator.module.css';

export interface ProgressStep {
  label: string;
  description?: string;
  icon?: ReactNode;
}

export interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (step: number) => void;
}

export function ProgressIndicator({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepClick,
}: ProgressIndicatorProps) {
  return (
    <div className={`${styles.progressIndicator} ${styles[orientation]}`}>
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && index <= currentStep;

        return (
          <div
            key={index}
            className={`${styles.step} ${isComplete ? styles.complete : ''} ${
              isCurrent ? styles.current : ''
            } ${isClickable ? styles.clickable : ''}`}
            onClick={() => isClickable && onStepClick(index)}
          >
            <div className={styles.stepIndicator}>
              <div className={styles.stepCircle}>
                {isComplete ? (
                  <Check size={16} />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && <div className={styles.stepLine} />}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>{step.label}</div>
              {step.description && (
                <div className={styles.stepDescription}>{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
