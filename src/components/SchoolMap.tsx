import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { colegios } from "@/content/colegios";

// Iconos por defecto de Leaflet rotos con bundlers: se reconfiguran a mano.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type Props = {
  dark: boolean;
  activeIndex: number | null;
  onMarkerClick: (index: number) => void;
};

function FlyToActive({ activeIndex }: { activeIndex: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (activeIndex === null) return;
    const school = colegios[activeIndex];
    map.flyTo([school.lat, school.lng], 11, { duration: 0.8 });
  }, [activeIndex, map]);
  return null;
}

export default function SchoolMap({ dark, activeIndex, onMarkerClick }: Props) {
  const tileUrl = dark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={[-35.5, -71.5]}
      zoom={4}
      scrollWheelZoom={false}
      className="h-[340px] w-full md:h-[480px]"
    >
      <TileLayer url={tileUrl} attribution="&copy; OpenStreetMap &copy; CARTO" />
      <FlyToActive activeIndex={activeIndex} />
      {colegios.map((school, i) => (
        <Marker
          key={school.name}
          position={[school.lat, school.lng]}
          eventHandlers={{ click: () => onMarkerClick(i) }}
        >
          <Popup>
            <strong>{school.name}</strong>
            <br />
            {school.place}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
