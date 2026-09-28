import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { colegios } from "@/content/colegios";
import { HOME, HOME_ZOOM, SCHOOL_ZOOM, leafletTiles } from "@/lib/mapConfig";

type Props = { dark: boolean; activeIndex: number | null; onMarkerClick: (i: number) => void };

function FlyToActive({ activeIndex }: { activeIndex: number | null }) {
  const map = useMap();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (activeIndex === null) map.flyTo(HOME, HOME_ZOOM, { duration: 0.8 });
    else map.flyTo([colegios[activeIndex].lat, colegios[activeIndex].lng], SCHOOL_ZOOM, { duration: 0.8 });
  }, [activeIndex, map]);
  return null;
}

const makeIcon = (active: boolean) =>
  L.divIcon({
    className: `cpt-marker${active ? " is-active" : ""}`,
    html: '<span class="halo"></span><span class="dot"></span>',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

export default function LeafletMap({ dark, activeIndex, onMarkerClick }: Props) {
  const icons = useMemo(() => ({ idle: makeIcon(false), active: makeIcon(true) }), []);
  const tiles = leafletTiles(dark);
  const start = activeIndex === null ? HOME : ([colegios[activeIndex].lat, colegios[activeIndex].lng] as [number, number]);

  return (
    <MapContainer
      center={start}
      zoom={activeIndex === null ? HOME_ZOOM : SCHOOL_ZOOM}
      scrollWheelZoom={false}
      className={`h-[420px] w-full md:h-[540px] ${tiles.cssDark ? "osm-dark" : ""}`}
    >
      <TileLayer key={tiles.url} url={tiles.url} attribution={tiles.attribution} maxZoom={19} />
      <FlyToActive activeIndex={activeIndex} />
      {colegios.map((s, i) => (
        <Marker
          key={s.name}
          position={[s.lat, s.lng]}
          icon={activeIndex === i ? icons.active : icons.idle}
          zIndexOffset={activeIndex === i ? 1000 : 0}
          eventHandlers={{ click: () => onMarkerClick(i) }}
        />
      ))}
    </MapContainer>
  );
}
