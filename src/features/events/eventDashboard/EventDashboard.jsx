import React, { useState } from "react";
import { Container, Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { sampleData } from "../../../app/api/sampleData";

export default function EventDashboard() {
  const [events, setEvents] = useState(sampleData);
  /* 
  function handleCreateEvents(event) {
    // spread events array and add teh new event
    setEvents([...events, event]);
    console.log(events);
  }

  function handleUpdateEvent(updatedEvent) {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    );
    selectEvent(null);
    setFormOpen(false);
  } */

  function handleDeleteEvent(eventId) {
    setEvents(events.filter((evt) => evt.id !== eventId));
  }

  return (
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Event Filters</h2>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
