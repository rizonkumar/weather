import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

interface WeatherMapProps {
  center: [number, number]; // [longitude, latitude]
  zoom?: number;
  mapType?: 'temp_new' | 'precipitation_new' | 'clouds_new' | 'wind_new';
}

const WeatherMap = ({ center, zoom = 7, mapType = 'temp_new' }: WeatherMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // OpenWeatherMap API key from environment variable
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    // Base map layer (OpenStreetMap)
    const baseLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    });

    // Weather layer
    const weatherLayer = new TileLayer({
      source: new XYZ({
        url: `https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${apiKey}`,
        attributions: ' OpenWeatherMap',
      }),
      opacity: 0.6,
    });

    // Create map instance
    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, weatherLayer],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, mapType]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-xl overflow-hidden border border-border/50"
      style={{ backgroundColor: '#f8f9fa' }}
    />
  );
};

export default WeatherMap;
