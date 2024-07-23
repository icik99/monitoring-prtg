import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const LeafletMap = () => {
  const position = [-6.975811791350922, 107.63062860490223];

  return (
    <div>
      <MapContainer center={position} zoom={18} style={{ height: '600px', width: '100%', zIndex: 10 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            PuTI, Gedung Panambulai, Pusat Teknologi Informasi Telkom University
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
