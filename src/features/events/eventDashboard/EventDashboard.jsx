import React from "react";
import { Container, Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { useSelector } from "react-redux";

export default function EventDashboard() {
  //const [events, setEvents] = useState(sampleData);

  const { events } = useSelector((state) => state.event);

  return (
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Event Filters</h2>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
