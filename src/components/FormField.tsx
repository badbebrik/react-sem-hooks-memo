import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const FormField: React.FC<FormFieldProps> = React.memo(
  ({ label, type, name, value, error, onChange, inputRef }) => {

    return (
      <div>
        <label>
          {label}:
          <input
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
          />
        </label>
        {error && <p>{error}</p>}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value && prevProps.error === nextProps.error
);

export default FormField;
