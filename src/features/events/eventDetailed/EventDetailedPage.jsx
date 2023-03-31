import React from "react";
import { Container, Grid } from "semantic-ui-react";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

export default function EventDetailedPage() {
  return (
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader />
          <EventDetailedInfo />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
