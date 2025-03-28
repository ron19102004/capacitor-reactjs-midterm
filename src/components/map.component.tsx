import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Avt from "../assets/avt.jpg";

const customIcon = new L.Icon({
  iconUrl: Avt,
  iconSize: [32, 32], // Kích thước icon
  iconAnchor: [16, 32], // Điểm neo icon
  popupAnchor: [0, -32], // Điểm xuất hiện popup
});

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<any>(null);

  function ZoomToLocation() {
    const map = useMap();
    const handleClick = () => {
      map.setView({ lat: latitude, lng: longitude }, 15); // Zoom về vị trí của mình
    };

    return (
      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "8px 12px",
          background: "white",
          border: "1px solid gray",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        🔍 Zoom về vị trí của tôi
      </button>
    );
  }
  return (
    <MapContainer
    center={[latitude, longitude]}
    zoom={13}
      style={{ height: "400px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>📍 Vị trí của bạn</Popup>
      </Marker>
      <ZoomToLocation />
    </MapContainer>
  );
};

export default MapComponent;
