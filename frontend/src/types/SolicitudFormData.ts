export interface ISolicitudFormData {
  // Datos Personales
  nombreCompleto: string;
  tipoIdentificacion: 'Cedula' | 'Pasaporte' | 'CE';
  numeroIdentificacion: string;
  email: string;
  telefono: string;

  // Datos Económicos
  actividadEconomica: string;
  ingresosDeclarados: number;
  esPep: boolean;
  manejaMonedaExtranjera: boolean;
}

export const ACTIVIDADES_ECONOMICAS = [
  'Comercio',
  'Servicios Profesionales',
  'Construcción',
  'Manufactura',
  'Tecnología',
  'Salud',
  'Educación',
  'Agricultura',
  'Transporte',
  'Turismo',
  'Otro'
];
