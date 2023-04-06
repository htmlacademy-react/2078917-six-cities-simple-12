import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Point } from '../../types/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';

type MapProps = {
  city: City | undefined;
  points: Point[];
  selectedPoint: Point | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    let markers: Marker[] = [];

    if (map) {
      markers = points.map((point) => {

        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        })
          .setIcon(
            point !== selectedPoint ? defaultCustomIcon : currentCustomIcon
          )
          .addTo(map);

        return marker;
      });
    }

    return () => {
      if (map) {
        markers.forEach((marker) => map.removeLayer(marker));
      }
    };
  }, [map, points, selectedPoint]);

  useEffect(() => {
    if (city) {
      map?.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );
    }
  }, [map, city]);

  return (
    <div
      style={{ height: '100%' }}
      ref={mapRef}
    >
    </div>
  );
}
