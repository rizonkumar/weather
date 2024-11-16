import { useEffect, useState, useRef } from 'react';
import { Viewer, Entity, ImageryLayer } from 'resium';
import { Cartesian3, Color, Math, UrlTemplateImageryProvider, Camera, Scene, Viewer as CesiumViewer } from '@cesium/engine';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

// Import Cesium styles
import '@cesium/widgets/Source/widgets.css';

interface WeatherMap3DProps {
  center: [number, number]; // [longitude, latitude]
  zoom?: number;
  className?: string;
  weatherData?: {
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
    description?: string;
    feelsLike?: number;
  };
}

interface LayerControl {
  id: string;
  label: string;
  type: string;
  enabled: boolean;
}

const WeatherMap3D = ({ center, zoom = 7, className, weatherData }: WeatherMap3DProps) => {
  const viewerRef = useRef<CesiumViewer | null>(null);
  const [layers, setLayers] = useState<LayerControl[]>([
    { id: 'temp', label: 'Temperature', type: 'temp', enabled: true },
    { id: 'precipitation', label: 'Precipitation', type: 'precipitation', enabled: true },
    { id: 'clouds', label: 'Cloud Coverage', type: 'clouds', enabled: true },
    { id: 'wind', label: 'Wind Speed', type: 'wind', enabled: true },
  ]);

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  // Configure viewer on mount
  useEffect(() => {
    if (viewerRef.current) {
      // Remove sky, atmosphere, and space background
      const scene = viewerRef.current.scene as Scene;
      scene.sun.show = false;
      scene.moon.show = false;
      scene.skyAtmosphere.show = false;
      scene.globe.enableLighting = false;
      scene.fog.enabled = false;
      scene.backgroundColor = Color.WHITE;
      scene.globe.baseColor = Color.WHITE;

      // Set initial camera position with smooth animation
      const destination = Cartesian3.fromDegrees(
        center[0],
        center[1],
        zoom * 50000
      );

      const orientation = {
        heading: 0.0,
        pitch: -Math.PI_OVER_TWO,
        roll: 0.0
      };

      (viewerRef.current.scene.camera as Camera).flyTo({
        destination,
        orientation,
        duration: 1.5,
        complete: () => {
          if (viewerRef.current) {
            const scene = viewerRef.current.scene as Scene;
            scene.globe.depthTestAgainstTerrain = false;
          }
        }
      });
    }
  }, [center, zoom]);

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  return (
    <div className={cn('relative h-[500px] w-full rounded-xl overflow-hidden', className)}>
      {/* Weather Data Panel */}
      <Card className="absolute top-4 left-4 z-10 bg-white/95 dark:bg-gray-900/95 shadow-lg w-64">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Current Weather</h3>
          <div className="space-y-3">
            {weatherData?.temperature !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Temperature</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {weatherData.temperature}°C
                </span>
              </div>
            )}
            {weatherData?.feelsLike !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Feels Like</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {weatherData.feelsLike}°C
                </span>
              </div>
            )}
            {weatherData?.humidity !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Humidity</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {weatherData.humidity}%
                </span>
              </div>
            )}
            {weatherData?.windSpeed !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Wind Speed</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {weatherData.windSpeed} m/s
                </span>
              </div>
            )}
            {weatherData?.description && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Condition</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {weatherData.description}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="absolute inset-0 z-0">
        <Viewer
          ref={(ref) => {
            if (ref?.cesiumElement) {
              viewerRef.current = ref.cesiumElement;
            }
          }}
          full
          scene3DOnly={true}
          baseLayerPicker={false}
          navigationHelpButton={false}
          homeButton={false}
          animation={false}
          timeline={false}
          fullscreenButton={false}
          geocoder={false}
          sceneModePicker={false}
          selectionIndicator={false}
          infoBox={false}
          creditContainer={document.createElement('div')}
        >
          {/* Base map layer */}
          <ImageryLayer
            imageryProvider={new UrlTemplateImageryProvider({
              url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
              minimumLevel: 0,
              maximumLevel: 18,
              credit: ''
            })}
          />

          {/* Center point marker */}
          <Entity
            position={Cartesian3.fromDegrees(center[0], center[1])}
            point={{ pixelSize: 10, color: Color.BLUE }}
          />
          
          {/* Weather layers */}
          {layers.filter(layer => layer.enabled).map(layer => (
            <ImageryLayer
              key={layer.id}
              imageryProvider={new UrlTemplateImageryProvider({
                url: `https://tile.openweathermap.org/map/${layer.type}/{z}/{x}/{y}.png?appid=${apiKey}`,
                minimumLevel: 0,
                maximumLevel: 18,
                credit: ''
              })}
              alpha={0.6}
            />
          ))}
        </Viewer>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2">
        <button
          onClick={() => {
            if (viewerRef.current) {
              const camera = viewerRef.current.scene.camera as Camera;
              const currentHeight = camera.positionCartographic.height;
              camera.zoomIn(currentHeight * 0.5);
            }
          }}
          className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-colors"
          aria-label="Zoom In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          onClick={() => {
            if (viewerRef.current) {
              const camera = viewerRef.current.scene.camera as Camera;
              const currentHeight = camera.positionCartographic.height;
              camera.zoomOut(currentHeight * 0.5);
            }
          }}
          className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-colors"
          aria-label="Zoom Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          onClick={() => {
            if (viewerRef.current) {
              const camera = viewerRef.current.scene.camera as Camera;
              camera.flyTo({
                destination: Cartesian3.fromDegrees(
                  center[0],
                  center[1],
                  zoom * 50000
                ),
                orientation: {
                  heading: 0.0,
                  pitch: -Math.PI_OVER_TWO,
                  roll: 0.0
                },
                duration: 1.5
              });
            }
          }}
          className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-colors"
          aria-label="Reset View"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </button>
      </div>

      {/* Layer controls */}
      <Card className="absolute top-4 right-4 z-10 bg-white/95 dark:bg-gray-900/95 shadow-lg">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Map Layers</h3>
          <div className="space-y-4">
            {layers.map(layer => (
              <div key={layer.id} className="flex items-center justify-between gap-4">
                <Label 
                  htmlFor={layer.id} 
                  className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap"
                >
                  {layer.label}
                </Label>
                <Switch
                  id={layer.id}
                  checked={layer.enabled}
                  onCheckedChange={() => toggleLayer(layer.id)}
                  className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-400"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherMap3D;