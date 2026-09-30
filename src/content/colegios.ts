export type Colegio = {
  name: string;
  place: string;
  lat: number;
  lng: number;
  /**
   * Fotos de la visita (grupo, exposición, etc.), para el futuro carrusel
   * tipo "álbum" dentro de la tarjeta del mapa. Ejemplo:
   * photos: [{ src: "/visitas/liceo-valpo-1.jpg", alt: "El equipo presentando en el liceo" }]
   * Mientras el arreglo esté vacío o ausente, la tarjeta no muestra el álbum.
   */
  photos?: { src: string; alt: string }[];
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
