import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { ISolicitudFormData } from '../types/SolicitudFormData';

interface FormCheckboxProps {
  label: string;
  name: keyof ISolicitudFormData;
  register: UseFormRegister<ISolicitudFormData>;
  error?: FieldError;
  description?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  name,
  register,
  error,
  description,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={name}
            type="checkbox"
            {...register(name)}
            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={name} className="font-medium text-gray-700">
            {label}
          </label>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
