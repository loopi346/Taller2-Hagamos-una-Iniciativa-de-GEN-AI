import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { ISolicitudFormData } from '../types/SolicitudFormData';

interface FormSelectProps {
  label: string;
  name: keyof ISolicitudFormData;
  register: UseFormRegister<ISolicitudFormData>;
  error?: FieldError;
  options: { value: string; label: string }[];
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  register,
  error,
  options,
  required = true,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
