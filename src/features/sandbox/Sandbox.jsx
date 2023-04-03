import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlacesInput";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }

  return (
    <Container className="main">
      <h1>testing 123</h1>
      <h3>the Data is: {data}</h3>
      <Button
        name="increment"
        loading={loading && target === "increment"}
        onClick={(E) => {
          dispatch(increment(10));
          setTarget(E.target.name);
        }}
        content="Increment"
        color="green"
      />
      <Button
        name="decrement"
        loading={loading && target === "decrement"}
        onClick={(E) => {
          dispatch(decrement(10));
          setTarget(E.target.name);
        }}
        content="Decrement"
        color="red"
      />

      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content="Open Modal"
        color="teal"
      />
      <div style={{ margintop: 15 }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </Container>
  );
}
