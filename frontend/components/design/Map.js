"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const position = [38.45381651011895, 27.176747262929403];

const LeafletMap = () => {
  return (
    <MapContainer
      className="map_container"
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%", zIndex: "10" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        subdomains={["a", "b", "c", "d"]}
        maxZoom={20}
      />

      <Marker position={position}>
        <Popup>PERDIST !</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
