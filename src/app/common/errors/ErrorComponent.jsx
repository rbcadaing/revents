import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Segment, Header, Button, Container } from "semantic-ui-react";

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);

  return (
    <Container className="main">
      {" "}
      <Segment placeholder>
        <Header
          textAlign="center"
          content={error?.message || "Oops - we have an error!"}
        />
        <Button
          as={Link}
          to="/events"
          primary
          style={{ marginTop: 20 }}
          content="Return to events page"
        />
      </Segment>
    </Container>
  );
}
