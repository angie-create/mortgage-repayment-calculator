import { useMortgageCalculator } from '../../hooks/useMortgageCalculator';
import MortgageForm from '../MortgageForm/MortgageForm';
import ResultsPanel from '../ResultsPanel/ResultsPanel';
import styles from './App.module.css';

const App: React.FC = () => {
  const mortgageCalculator = useMortgageCalculator();

  return (
    <div className={styles.app}>
      <main className={styles.container}>
        <section className={styles.formSection} aria-label="Mortgage calculator form">
          <MortgageForm {...mortgageCalculator} />
        </section>
        
        <section className={styles.resultsSection} aria-label="Calculation results">
          <ResultsPanel 
            results={mortgageCalculator.results}
            isLoading={mortgageCalculator.isCalculating}
          />
        </section>
      </main>
      
      <div className={styles.attribution}>
        Challenge by{' '}
        <a 
          href="https://www.frontendmentor.io?ref=challenge" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Angie Parada
        </a>
        .
      </div>
    </div>
  );
};

export default App;