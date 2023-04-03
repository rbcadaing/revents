import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

export default function EventDetailedMap({ latLng }) {
  const zoom = 14;

  function Marker() {
    return <Icon name="marker" color="red" size="big" />;
  }
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: 300, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB-SPJ3LlsTGLcYmyg0cb8V5wDAGgDrVGY" }}
          center={latLng}
          defaultZoom={zoom}
        >
          <Marker lat={latLng.lat} lng={latLng.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
}
