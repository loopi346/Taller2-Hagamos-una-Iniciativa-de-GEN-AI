import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISolicitudFormData, ACTIVIDADES_ECONOMICAS } from '../types/SolicitudFormData';
import { solicitudValidationSchema } from '../schemas/solicitudValidationSchema';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';

export const SolicitudVinculacionForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISolicitudFormData>({
    resolver: yupResolver(solicitudValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ISolicitudFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implementar llamada al backend API (TASK-003)
      console.log('Datos del formulario:', data);

      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Solicitud enviada exitosamente.Recibirá una respuesta en 5 segundos.');
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al enviar la solicitud. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tipoIdentificacionOptions = [
    { value: 'Cedula', label: 'Cédula de Ciudadanía' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'CE', label: 'Cédula de Extranjería' },
  ];

  const actividadEconomicaOptions = ACTIVIDADES_ECONOMICAS.map((actividad) => ({
    value: actividad,
    label: actividad,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Solicitud de Vinculación Bancaria
            </h1>
            <p className="text-gray-600">
              Complete el formulario con sus datos personales y económicos.
              Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Sección: Datos Personales */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Datos Personales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormInput
                    label="Nombre Completo"
                    name="nombreCompleto"
                    type="text"
                    register={register}
                    error={errors.nombreCompleto}
                    placeholder="Ingrese su nombre completo"
                  />
                </div>

                <FormSelect
                  label="Tipo de Identificación"
                  name="tipoIdentificacion"
                  register={register}
                  error={errors.tipoIdentificacion}
                  options={tipoIdentificacionOptions}
                />

                <FormInput
                  label="Número de Identificación"
                  name="numeroIdentificacion"
                  type="text"
                  register={register}
                  error={errors.numeroIdentificacion}
                  placeholder="Ingrese su número de identificación"
                />

                <FormInput
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  register={register}
                  error={errors.email}
                  placeholder="ejemplo@correo.com"
                />

                <FormInput
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  register={register}
                  error={errors.telefono}
                  placeholder="+57 300 123 4567"
                />
              </div>
            </div>

            {/* Sección: Datos Económicos */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Datos Económicos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  label="Actividad Económica"
                  name="actividadEconomica"
                  register={register}
                  error={errors.actividadEconomica}
                  options={actividadEconomicaOptions}
                />

                <FormInput
                  label="Ingresos Mensuales Declarados (COP)"
                  name="ingresosDeclarados"
                  type="number"
                  register={register}
                  error={errors.ingresosDeclarados}
                  placeholder="0"
                />

                <div className="md:col-span-2">
                  <FormCheckbox
                    label="¿Es usted una Persona Expuesta Políticamente (PEP)?"
                    name="esPep"
                    register={register}
                    error={errors.esPep}
                    description="Persona que desempeña o ha desempeñado funciones públicas destacadas"
                  />
                </div>

                <div className="md:col-span-2">
                  <FormCheckbox
                    label="¿Maneja operaciones en moneda extranjera?"
                    name="manejaMonedaExtranjera"
                    register={register}
                    error={errors.manejaMonedaExtranjera}
                    description="Indique si realiza transacciones en divisas diferentes al peso colombiano"
                  />
                </div>
              </div>
            </div>

            {/* Botón de Envío */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
                  !isValid || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Validar y Enviar'}
              </button>
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Validación Automática</h3>
              <p className="mt-1 text-sm text-blue-700">
                Su solicitud será validada automáticamente por nuestro sistema de IA.
                Recibirá una respuesta en aproximadamente 5 segundos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
