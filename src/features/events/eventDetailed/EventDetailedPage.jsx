import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToEvents } from "../eventActions";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function EventDetailedPage() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === id)
  );
  console.log(`event-${event.id}`);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [id, dispatch],
  });

  // console.log(!!event);
  // console.log(error);
  //TODO Address Error handling
  // console.log(`error-${error?.message}`);
  // console.log(`Loading-${loading}`);
  // console.log(`event-${event.title}`);

  if (loading || (!!event && !!error))
    return <LoadingComponent content="Loading Event ..." />;

  return (
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={event?.attendees} />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
