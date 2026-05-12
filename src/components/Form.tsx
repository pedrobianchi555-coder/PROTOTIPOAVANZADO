import React, { SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, className = '' }) => (
  <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
    {children}
  </form>
);

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {children}
  </div>
);

interface FormLabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children, required = false }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gris-700">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string | number; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}) => (
  <FormGroup>
    {label && <FormLabel htmlFor={id || ''}>{label}</FormLabel>}
    <select
      id={id}
      className={`input ${error ? 'border-red-500 ring-red-100' : ''} ${className}`}
      {...props}
    >
      <option value="">Selecciona una opción</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </FormGroup>
);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  rows = 4,
  className = '',
  id,
  ...props
}) => (
  <FormGroup>
    {label && <FormLabel htmlFor={id || ''}>{label}</FormLabel>}
    <textarea
      id={id}
      rows={rows}
      className={`input ${error ? 'border-red-500 ring-red-100' : ''} ${className}`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </FormGroup>
);

interface FormRowProps {
  children: ReactNode;
  cols?: number;
  className?: string;
}

export const FormRow: React.FC<FormRowProps> = ({ children, cols = 2, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4 ${className}`}>
    {children}
  </div>
);
