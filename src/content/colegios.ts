export type Colegio = {
  name: string;
  place: string;
  lat: number;
  lng: number;
};

// Datos de ejemplo. Cuando conecten Supabase (ver README), esto se
// reemplaza por un fetch a la tabla `colegios`.
export const colegios: Colegio[] = [
  { name: "Liceo Bicentenario Valparaíso", place: "Valparaíso", lat: -33.0472, lng: -71.6127 },
  { name: "Colegio San Ignacio", place: "Santiago", lat: -33.45, lng: -70.6667 },
  { name: "Escuela Villa Alemana", place: "Villa Alemana", lat: -33.0422, lng: -71.3742 },
  { name: "Liceo Enrique Molina", place: "Concepción", lat: -36.8269, lng: -73.0498 },
  { name: "Colegio Cruz del Norte", place: "Antofagasta", lat: -23.6509, lng: -70.3975 },
];
