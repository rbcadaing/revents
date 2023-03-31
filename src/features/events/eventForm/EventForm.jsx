import cuid from "cuid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";

export default function EventForm() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === id)
  );

  //null conditional value
  let initialValues = {};
  if (selectedEvent === null || selectedEvent === undefined) {
    initialValues = {
      title: "",
      category: "",
      description: "",
      city: "",
      venue: "",
      date: "",
    };
  } else {
    initialValues = selectedEvent;
  }

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (selectedEvent === null || selectedEvent === undefined) {
      setValues({
        title: "",
        category: "",
        description: "",
        city: "",
        venue: "",
        date: "",
      });
    }
  }, [selectedEvent]);

  function handleFormSubmit() {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : //cuid generates id
        dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: "bob",
            attendees: [],
            hostPhotoURL: "/assets/user.png",
          })
        );
    navigate("/events");
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    // spread values and assign the matching element name with the value
    setValues({ ...values, [name]: value });
  }
  return (
    <Container className="main">
      <Segment clearing>
        <Header
          content={selectedEvent ? "edit this event" : "Create New Event"}
        />
        <Form onSubmit={handleFormSubmit}>
          <Form.Field>
            <input
              type="text"
              placeholder="Event title"
              name="title"
              value={values.title}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={values.category}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={values.description}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={values.city}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="Venue"
              name="venue"
              value={values.venue}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={values.date}
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            as={Link}
            to="/events"
            type="submit"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Segment>
    </Container>
  );
}
