import { useState } from 'react';
import type { MortgageResults } from '../../types';
import MortgageForm from '../MortgageForm/MortgageForm';
import ResultsPanel from '../ResultsPanel/ResultsPanel';
import styles from './App.module.css';

const App: React.FC = () => {
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculation = (calculatedResults: MortgageResults) => {
    setIsCalculating(false);
    setResults(calculatedResults);
  };

  const handleCalculationStart = () => {
    setIsCalculating(true);
  };

  return (
    <div className={styles.app}>
      <main className={styles.container}>
        <section className={styles.formSection} aria-label="Mortgage calculator form">
          <MortgageForm 
            onCalculate={handleCalculation}
            onCalculationStart={handleCalculationStart}
          />
        </section>
        
        <section className={styles.resultsSection} aria-label="Calculation results">
          <ResultsPanel 
            results={results}
            isLoading={isCalculating}
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