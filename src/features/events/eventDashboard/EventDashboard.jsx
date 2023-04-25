import React, {useEffect, useState} from "react";
import {Container, Grid, Loader} from "semantic-ui-react";
import EventList from "./EventList";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import EventsFeed from "./EventsFeed";
import {clearEvents, fetchEvents} from "../eventActions";

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {events, moreEvents} = useSelector((state) => state.event);
  const {loading} = useSelector((state) => state.async);
  const {authenticated} = useSelector((state) => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "All"],
    ])
  );

  function handleSetPredicate(key, value) {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    });
    return () => {
      dispatch(clearEvents());
    };
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
      (lastVisible) => {
        setLastDocSnapshot(lastVisible);
      }
    );
  }

  return (
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          {loadingInitial && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )}
          <EventList
            events={events}
            getNextEvents={handleFetchNextEvents}
            loading={loading}
            moreEvents={moreEvents}
          />
          {/*           <Button
            loading={loading}
            disabled={!moreEvents}
            onClick={handleFetchNextEvents}
            color="green"
            content="more..."
            floated="right"
          /> */}
        </Grid.Column>
        <Grid.Column width={6}>
          {authenticated && <EventsFeed />}
          <EventFilters
            predicate={predicate}
            setPredicate={handleSetPredicate}
            loading={loading}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
