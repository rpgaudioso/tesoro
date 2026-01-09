import { Check } from 'lucide-react';
import styles from './Stepper.module.css';

export interface Step {
  label: string;
  description?: string;
  isCompleted?: boolean;
  isError?: boolean;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (index: number) => void;
}

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepClick,
}: StepperProps) {
  return (
    <div className={`${styles.stepper} ${styles[orientation]}`}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = step.isCompleted || index < currentStep;
        const isError = step.isError;
        const isClickable = onStepClick && (isCompleted || isActive);

        return (
          <div key={index} className={styles.stepWrapper}>
            <div
              className={`${styles.step} ${isActive ? styles.active : ''} ${
                isCompleted ? styles.completed : ''
              } ${isError ? styles.error : ''} ${isClickable ? styles.clickable : ''}`}
              onClick={() => isClickable && onStepClick?.(index)}
            >
              <div className={styles.stepIndicator}>
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span className={styles.stepNumber}>{index + 1}</span>
                )}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepLabel}>{step.label}</div>
                {step.description && (
                  <div className={styles.stepDescription}>{step.description}</div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${styles.connector} ${
                  isCompleted ? styles.connectorCompleted : ''
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
