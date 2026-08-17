import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '8px',
};

const center = {
  // 53a 4th Ave, Linden, Randburg, 2104
  lat: -26.1480,
  lng: 27.9913
};

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // Use `import.meta.env` for Vite projects
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        <Marker position={center} title="Grow Green Landscaping & Design" />
      </GoogleMap>
  ) : <div>Loading Map...</div>
}

export default React.memo(MapComponent);