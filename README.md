# Frontend Mentor - Mortgage Repayment Calculator Solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Links

- Solution URL: [GitHub Repository](https://github.com/angie-create/mortgage-repayment-calculator)
- Live Site URL: [Live Demo](https://angie-create.github.io/mortgage-repayment-calculator/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Modules
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Vite](https://vitejs.dev/) - Build tool
- [React Hook Form](https://react-hook-form.com/) - For form handling and validation

### What I learned

This project helped me practice several key concepts:

1. **Form validation with React Hook Form**: Implementing real-time validation with custom error messages and accessibility features.

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
  clearErrors
} = useForm<MortgageFormData>();
```

2. **CSS Modules for component-scoped styling**: Using CSS Modules to avoid style conflicts and maintain clean, modular CSS.

```css
.formField:has([name="term"]),
.formField:has([name="rate"]) {
  max-width: 200px !important;
  width: 200px !important;
}
```

3. **Custom hooks for business logic**: Separating form logic and calculations into reusable hooks.

```typescript
const calculateMortgage = (amount: number, term: number, rate: number, type: string) => {
  const monthlyRate = rate / 100 / 12;
  const totalPayments = term * 12;
  // Calculation logic...
};
```

## Author

- Frontend Mentor - [@angie-create](https://www.frontendmentor.io/profile/angie-create)
- GitHub - [@angie-create](https://github.com/angie-create)