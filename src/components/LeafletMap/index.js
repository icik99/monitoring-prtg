import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const LeafletMap = () => {
  const position = [-6.971720250604408, 107.63241608688661];

  return (
    <div>
      <MapContainer center={position} zoom={18} style={{ height: '600px', width: '100%', zIndex: 10 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Gedung Panambulai, Pusat Teknologi Informasi Telkom University
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
