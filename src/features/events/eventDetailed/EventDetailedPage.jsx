import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Container, Grid} from "semantic-ui-react";
import {listenToEventFromFirestore} from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";

import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {listenToSelectedEvent} from "../eventActions";

export default function EventDetailedPage() {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.auth);

  let {id} = useParams();

  const event = useSelector((state) => state.event.selectedEvent);

  const {loading, error} = useSelector((state) => state.async);
  const isHost = event?.hostUid === currentUser?.uid;
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [id, dispatch],
  });

  // console.log(!!event);
  // console.log(error);
  //TODO Address Error handling
  // For page Refresh
  // console.log(`error-${error?.message}`);
  // console.log(`Loading-${loading}`);
  // console.log(`event-${event.title}`);

  if (loading || (!!event && !!error))
    return <LoadingComponent content="Loading Event ..." />;

  return (
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat eventId={event?.id} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar
            attendees={event?.attendees}
            hostUid={event?.hostUid}
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
