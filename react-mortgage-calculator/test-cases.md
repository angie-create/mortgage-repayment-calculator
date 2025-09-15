# Mortgage Calculator Test Cases

## Form Validation Tests

### 1. Required Field Validation
- [ ] Empty amount field shows error
- [ ] Empty term field shows error  
- [ ] Empty rate field shows error
- [ ] No mortgage type selected shows error

### 2. Numeric Validation
- [ ] Non-numeric amount rejected
- [ ] Non-numeric term rejected
- [ ] Non-numeric rate rejected
- [ ] Negative values rejected
- [ ] Zero values handled appropriately

### 3. Range Validation
- [ ] Amount: 1 - 10,000,000 range enforced
- [ ] Term: 1 - 50 years range enforced
- [ ] Rate: 0.01 - 50% range enforced

### 4. Input Formatting
- [ ] Amount displays with commas (e.g., 300,000)
- [ ] Rate accepts decimals (e.g., 5.25)
- [ ] Term accepts whole numbers only

## Calculation Tests

### 5. Repayment Mortgage
- [ ] £300,000, 25 years, 5.25% = £1,797.74/month
- [ ] £400,000, 30 years, 4.5% = £2,026.74/month
- [ ] Edge case: 0% interest rate

### 6. Interest Only Mortgage
- [ ] £300,000, 25 years, 5.25% = £1,312.50/month
- [ ] Total includes principal repayment
- [ ] Interest calculation accuracy

### 7. Edge Cases
- [ ] Very large amounts (£10M)
- [ ] Very small amounts (£1)
- [ ] Maximum term (50 years)
- [ ] Minimum term (1 year)
- [ ] High interest rates (50%)
- [ ] Low interest rates (0.01%)

## Accessibility Tests

### 8. Keyboard Navigation
- [ ] Tab through all form fields
- [ ] Enter submits form
- [ ] Space/Enter activates radio buttons
- [ ] Focus visible on all interactive elements

### 9. Screen Reader
- [ ] All inputs properly labeled
- [ ] Error messages announced
- [ ] Required fields identified
- [ ] Results properly announced

## Responsive Design Tests

### 10. Mobile (375px)
- [ ] Form stacks vertically
- [ ] Inputs remain usable
- [ ] Text remains readable
- [ ] Touch targets adequate size

### 11. Desktop (1440px)
- [ ] Side-by-side layout
- [ ] Proper spacing and proportions
- [ ] Hover states work correctly

## User Experience Tests

### 12. Real-time Validation
- [ ] Errors appear on blur
- [ ] Errors clear when valid input entered
- [ ] Submit button enables/disables appropriately

### 13. Clear Functionality
- [ ] Clear All resets entire form
- [ ] Focus moves to first input after clear
- [ ] Results panel returns to empty state

### 14. Loading States
- [ ] Loading spinner appears during calculation
- [ ] Button disabled during loading
- [ ] Results update after loading completes