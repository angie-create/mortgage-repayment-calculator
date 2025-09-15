import type { RadioGroupProps } from '../../types';
import styles from './RadioGroup.module.css';

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  error
}) => {
  const hasError = Boolean(error);
  const errorId = `error-${name}`;

  return (
    <div className={styles.radioGroup} role="radiogroup" aria-labelledby={`label-${name}`}>
      <div id={`label-${name}`} className={styles.label}>
        Mortgage Type
      </div>
      
      <div className={styles.options}>
        {options.map((option) => {
          const isChecked = value === option.value;
          const optionId = `${name}-${option.value}`;
          
          return (
            <div
              key={option.value}
              className={`${styles.option} ${isChecked ? styles.checked : ''} ${hasError ? styles.error : ''}`}
              onClick={() => onChange(option.value)}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={(e) => onChange(e.target.value)}
                className={styles.radioInput}
                aria-describedby={hasError ? errorId : undefined}
              />
              
              <div className={styles.radioCustom} aria-hidden="true" />
              
              <label htmlFor={optionId} className={styles.optionLabel}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      
      {hasError && (
        <div 
          id={errorId}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default RadioGroup;