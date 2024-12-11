/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"





export const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapId:"DEMO_MAP_ID"
    });

    // new window.google.maps.Marker({ position: center, map: map })
    new window.google.maps.marker.AdvancedMarkerElement({
      map:map,
      position: center,
      title: 'imam husain',
    })
  }, [center, zoom]);


  return (
    <>
      <div
        ref={mapRef}
        className={` w-full h-full ${props.className}`}
        style={props.style}
      >
      </div>
    </>
  );
}