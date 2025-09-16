import type { MortgageResults } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import styles from './ResultsPanel.module.css';

interface ResultsPanelProps {
  results?: MortgageResults | null;
  isLoading?: boolean;
}

const EmptyIllustration = () => (
  <img 
    src="/illustration-empty.svg"
    alt=""
    className={styles.emptyIllustration}
    aria-hidden="true"
  />
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