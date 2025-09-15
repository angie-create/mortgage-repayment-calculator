import type { MortgageResults } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import styles from './ResultsPanel.module.css';

interface ResultsPanelProps {
  results?: MortgageResults | null;
  isLoading?: boolean;
}

const EmptyIllustration = () => (
  <svg 
    className={styles.emptyIllustration}
    viewBox="0 0 192 192" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g id="illustration-empty">
      <circle cx="96" cy="96" r="96" fill="url(#paint0_linear)"/>
      <g opacity="0.5">
        <path d="M96 144c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48z" fill="url(#paint1_linear)"/>
      </g>
      <path d="M96 128c17.673 0 32-14.327 32-32s-14.327-32-32-32-32 14.327-32 32 14.327 32 32 32z" fill="white"/>
      <path d="M88 80h16v32H88V80z" fill="#9CA3AF"/>
      <path d="M80 88h32v16H80V88z" fill="#9CA3AF"/>
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5E7EB"/>
          <stop offset="1" stopColor="#9CA3AF"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="48" y1="48" x2="144" y2="144" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3F4F6"/>
          <stop offset="1" stopColor="#D1D5DB"/>
        </linearGradient>
      </defs>
    </g>
  </svg>
);

const EmptyState = () => (
  <div className={styles.emptyState}>
    <EmptyIllustration />
    <h2 className={styles.emptyTitle}>Results shown here</h2>
    <p className={styles.emptyDescription}>
      Complete the form and click "calculate repayments" to see what 
      your monthly repayments would be.
    </p>
  </div>
);

const LoadingState = () => (
  <div className={styles.loadingSpinner}>
    <div className={styles.spinner} role="status" aria-label="Calculating mortgage repayments">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const ResultsContent: React.FC<{ results: MortgageResults }> = ({ results }) => (
  <div className={styles.resultsContent}>
    <div className={styles.resultsHeader}>
      <h2 className={styles.resultsTitle}>Your results</h2>
      <p className={styles.resultsDescription}>
        Your results are shown below based on the information you provided. 
        To adjust the results, edit the form and click "calculate repayments" again.
      </p>
    </div>

    <div className={styles.resultsData}>
      <div className={styles.resultItem}>
        <span className={styles.resultLabel}>Your monthly repayments</span>
        <div className={styles.resultValue}>
          {formatCurrency(results.monthlyRepayment)}
        </div>
      </div>

      <div className={styles.resultItem}>
        <span className={styles.resultLabel}>Total you'll repay over the term</span>
        <div className={`${styles.resultValue} ${styles.secondary}`}>
          {formatCurrency(results.totalRepayment)}
        </div>
      </div>
    </div>
  </div>
);

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, isLoading = false }) => {
  return (
    <div className={styles.resultsPanel} role="region" aria-label="Calculation results">
      {isLoading ? (
        <LoadingState />
      ) : results ? (
        <ResultsContent results={results} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ResultsPanel;