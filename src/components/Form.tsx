import React, { useState, useRef, useCallback, useMemo } from 'react';
import FormField from './FormField';
import { useFormValidation } from '../hooks/useFormValidation';

const Form: React.FC = () => {
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' });
  const [submitMessage, setSubmitMessage] = useState('');

  const { validationResults, isFormValid } = useFormValidation(formValues);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const validationErrors = useMemo(() => ({
    name: validationResults.name ? '' : 'Имя должно содержать хотя бы 3 символа',
    email: validationResults.email ? '' : 'Введите правильный email',
    password: validationResults.password ? '' : 'Пароль должен быть не менее 6 символов',
  }), [validationResults]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isFormValid) {
        setSubmitMessage('Форма успешно отправлена');
      } else {
        setSubmitMessage('Исправьте ошибки в форме');
        if (!validationResults.name) nameInputRef.current?.focus();
        else if (!validationResults.email) emailInputRef.current?.focus();
        else if (!validationResults.password) passwordInputRef.current?.focus();
      }
    },
    [isFormValid, validationResults]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Имя"
          type="text"
          name="name"
          value={formValues.name}
          error={validationErrors.name}
          onChange={handleInputChange}
          inputRef={nameInputRef}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formValues.email}
          error={validationErrors.email}
          onChange={handleInputChange}
          inputRef={emailInputRef}
        />
        <FormField
          label="Пароль"
          type="password"
          name="password"
          value={formValues.password}
          error={validationErrors.password}
          onChange={handleInputChange}
          inputRef={passwordInputRef}
        />

        <button type="submit" disabled={!isFormValid}>
          Отправить
        </button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
};

export default Form;
