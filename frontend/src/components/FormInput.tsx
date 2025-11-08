import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { ISolicitudFormData } from '../types/SolicitudFormData';

interface FormInputProps {
  label: string;
  name: keyof ISolicitudFormData;
  type?: 'text' | 'email' | 'tel' | 'number';
  register: UseFormRegister<ISolicitudFormData>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  required = true,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
