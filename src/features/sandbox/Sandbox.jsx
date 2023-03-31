import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  return (
    <>
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
    </>
  );
}
