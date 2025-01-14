import * as React from 'react';
import {useRouteLoaderData} from '@remix-run/react';

export default function FooterLocations() {
  const data = useRouteLoaderData('root');

  if (!data.geoData || (!data.geoData.state && !data.geoData.zipCode)) {
    return <p>Unable to fetch geolocation data.</p>;
  }

  return (
    <div>
      <h1>User Geolocation</h1>
      <p>State: {data.geoData.state || 'N/A'}</p>
      <p>Zip Code: {data.geoData.zipCode || 'N/A'}</p>
    </div>
  );
}
