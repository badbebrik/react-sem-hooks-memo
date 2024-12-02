import { useState, useEffect } from 'react';

interface ValidationResult {
  name: boolean;
  email: boolean;
  password: boolean;
}

interface UseFormValidationResult {
  validationResults: ValidationResult;
  isFormValid: boolean;
}

export const useFormValidation = (
  values: { name: string; email: string; password: string }
): UseFormValidationResult => {
  const [validationResults, setValidationResults] = useState<ValidationResult>({
    name: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    const nameValid = values.name.length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    const passwordValid = values.password.length >= 6;

    setValidationResults({ name: nameValid, email: emailValid, password: passwordValid });
  }, [values]);

  const isFormValid = Object.values(validationResults).every(Boolean);

  return { validationResults, isFormValid };
};
