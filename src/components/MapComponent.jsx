import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMapEvents } from 'react-leaflet';
import { useAppContext } from '../store/AppContext';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapStateSync() {
  const { mapType, setMapType } = useAppContext();
  useMapEvents({
    baselayerchange: (e) => {
      setMapType(e.name);
    }
  });
  return null;
}

function MapComponent({ interactive = true, zoom = 13, center = [23.777, 90.399] }) {
  const { incidents, units, hospitals, mapType } = useAppContext();

  // Create custom markers using SVG strings and Leaflet's divIcon
  const createMarkerIcon = (type, color) => {
    return divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#EF4444';
      case 'High': return '#F97316';
      case 'Medium': return '#EAB308';
      case 'Low': return '#60A5FA';
      default: return '#94A3B8';
    }
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%', zIndex: 0 }} 
      zoomControl={interactive} 
      dragging={interactive} 
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
    >
      <MapStateSync />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked={mapType === 'Dark Matter'} name="Dark Matter">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
        </LayersControl.BaseLayer>
        
        <LayersControl.BaseLayer checked={mapType === 'Light (Positron)'} name="Light (Positron)">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer checked={mapType === 'Street (OSM)'} name="Street (OSM)">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      
      {/* Incidents */}
      {incidents.filter(i => i.status !== 'RESOLVED').map(incident => (
        <Marker 
          key={incident.id} 
          position={incident.coordinates}
          icon={createMarkerIcon('incident', getPriorityColor(incident.priority))}
        >
          {interactive && (
            <Popup>
              <div>
                <strong>{incident.type}</strong><br />
                {incident.location}<br />
                Priority: {incident.priority}<br />
                Status: {incident.status}
              </div>
            </Popup>
          )}
        </Marker>
      ))}

      {/* Units */}
      {units.filter(u => u.status !== 'OFFLINE').map(unit => (
        <Marker 
          key={unit.id} 
          position={unit.coordinates}
          icon={createMarkerIcon('unit', '#38BDF8')}
        >
          {interactive && (
            <Popup>
              <div>
                <strong>{unit.type} Unit {unit.id}</strong><br />
                Status: {unit.status}<br />
                {unit.eta && `ETA: ${unit.eta}`}
              </div>
            </Popup>
          )}
        </Marker>
      ))}

      {/* Hospitals */}
      {hospitals.map(hospital => (
        <Marker 
          key={hospital.id} 
          position={hospital.coordinates}
          icon={createMarkerIcon('hospital', '#22C55E')}
        >
          {interactive && (
            <Popup>
              <div>
                <strong>{hospital.name}</strong><br />
                Status: {hospital.status}<br />
                Available Beds: {hospital.availableBeds}
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
