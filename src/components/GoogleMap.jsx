import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  // 31 Urania St, Observatory, Johannesburg, 2198
  lat: -26.1843,
  lng: 28.0788
};

const MapComponent = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const customMarkerIcon = React.useMemo(() => {
    if (!isLoaded) return null;
    return {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillColor: '#8CB974', // Your brand's primary green
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#0D4733', // Your brand's dark green for the border
      rotation: 0,
      scale: 1.8,
      anchor: new window.google.maps.Point(12, 24),
    };
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading map. Please check your API key and network connection.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
    >
      <Marker position={center} title="Grow Green Landscaping & Design" icon={customMarkerIcon} />
    </GoogleMap>
  );
}

export default React.memo(MapComponent);