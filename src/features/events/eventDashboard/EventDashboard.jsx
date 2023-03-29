import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";
import { sampleData } from "../../../app/api/sampleData";

export default function EventDashboard(props) {
  const [events, setEvents] = useState(sampleData);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* Show  the event form if formOpen is = true (render component after && if formOpen = true) */}
        {props.formOpen && <EventForm setFormOpen={props.setFormOpen} />}
      </Grid.Column>
    </Grid>
  );
}
