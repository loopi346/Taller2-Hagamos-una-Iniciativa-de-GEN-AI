import * as yup from 'yup';

export const solicitudValidationSchema = yup.object({
  // Datos Personales
  nombreCompleto: yup
    .string()
    .required('El nombre completo es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),

  tipoIdentificacion: yup
    .string()
    .required('El tipo de identificación es obligatorio')
    .oneOf(['Cedula', 'Pasaporte', 'CE'], 'Tipo de identificación inválido'),

  numeroIdentificacion: yup
    .string()
    .required('El número de identificación es obligatorio')
    .min(5, 'El número de identificación debe tener al menos 5 caracteres')
    .max(20, 'El número de identificación no puede exceder 20 caracteres')
    .matches(/^[a-zA-Z0-9]+$/, 'El número de identificación solo puede contener letras y números'),

  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Debe ser un email válido')
    .max(100, 'El email no puede exceder 100 caracteres'),

  telefono: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números, +, -, espacios y paréntesis')
    .min(7, 'El teléfono debe tener al menos 7 caracteres')
    .max(20, 'El teléfono no puede exceder 20 caracteres'),

  // Datos Económicos
  actividadEconomica: yup
    .string()
    .required('La actividad económica es obligatoria'),

  ingresosDeclarados: yup
    .number()
    .required('Los ingresos declarados son obligatorios')
    .min(0, 'Los ingresos no pueden ser negativos')
    .max(999999999, 'Los ingresos exceden el límite permitido')
    .typeError('Los ingresos deben ser un número válido'),

  esPep: yup
    .boolean()
    .required('Debe indicar si es una Persona Expuesta Políticamente'),

  manejaMonedaExtranjera: yup
    .boolean()
    .required('Debe indicar si maneja moneda extranjera'),
}).required();
