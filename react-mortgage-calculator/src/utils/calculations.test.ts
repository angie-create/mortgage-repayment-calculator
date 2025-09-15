// Quick calculation verification tests
import { calculateMortgage } from './calculations';

// Test data for verification
const testCases = [
  {
    name: 'Standard Repayment Mortgage',
    input: { amount: '300000', term: '25', rate: '5.25', type: 'repayment' as const },
    expected: { monthlyRepayment: 1797.74, totalRepayment: 539322 }
  },
  {
    name: 'Interest Only Mortgage', 
    input: { amount: '300000', term: '25', rate: '5.25', type: 'interestOnly' as const },
    expected: { monthlyRepayment: 1312.5, totalRepayment: 693750 }
  },
  {
    name: 'Zero Interest Rate',
    input: { amount: '300000', term: '25', rate: '0', type: 'repayment' as const },
    expected: { monthlyRepayment: 1000, totalRepayment: 300000 }
  },
  {
    name: 'High Interest Rate',
    input: { amount: '100000', term: '30', rate: '10', type: 'repayment' as const },
    expected: { monthlyRepayment: 877.57, totalRepayment: 315925.20 }
  }
];

// Console test results (for manual verification)
console.log('=== Mortgage Calculator Test Results ===\n');

testCases.forEach(testCase => {
  const result = calculateMortgage(testCase.input);
  const monthlyDiff = Math.abs(result.monthlyRepayment - testCase.expected.monthlyRepayment);
  const totalDiff = Math.abs(result.totalRepayment - testCase.expected.totalRepayment);
  
  console.log(`${testCase.name}:`);
  console.log(`  Input: £${testCase.input.amount}, ${testCase.input.term}y, ${testCase.input.rate}%, ${testCase.input.type}`);
  console.log(`  Monthly: £${result.monthlyRepayment.toFixed(2)} (expected: £${testCase.expected.monthlyRepayment.toFixed(2)}) - Diff: £${monthlyDiff.toFixed(2)}`);
  console.log(`  Total: £${result.totalRepayment.toFixed(2)} (expected: £${testCase.expected.totalRepayment.toFixed(2)}) - Diff: £${totalDiff.toFixed(2)}`);
  console.log(`  ✓ ${monthlyDiff < 1 && totalDiff < 100 ? 'PASS' : 'NEEDS REVIEW'}\n`);
});

export {};