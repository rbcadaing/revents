import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  return (
    <Container className="main">
      <h1>testing 123</h1>
      <h3>the Data is: {data}</h3>
      <Button
        onClick={() => dispatch(increment(10))}
        content="Increment"
        color="green"
      />
      <Button
        onClick={() => dispatch(decrement(5))}
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
    </Container>
  );
}
