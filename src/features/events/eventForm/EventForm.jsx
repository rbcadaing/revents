import { Formik, Form } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import cuid from "cuid";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { updateEvent, createEvent } from "../eventActions";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

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

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title!"),
    category: Yup.string().required("You must provide a category!"),
    description: Yup.string().required("You must provide a description!"),
    city: Yup.string().required("You must provide a city!"),
    venue: Yup.string().required("You must provide a venue!"),
    date: Yup.string().required("You must provide a date!"),
  });

  // useEffect(() => {
  //   if (selectedEvent === null || selectedEvent === undefined) {
  //     setValues({
  //       title: "",
  //       category: "",
  //       description: "",
  //       city: "",
  //       venue: "",
  //       date: "",
  //     });
  //   }
  // }, [selectedEvent]);

  return (
    <Container className="main">
      <Segment clearing>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
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
          }}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="ui form">
              <Header sub color="teal" content="Event Details" />
              <MyTextInput name="title" placeholder="Event title" />
              <MySelectInput
                name="category"
                placeholder="Event category"
                options={categoryData}
              />
              <MyTextArea
                name="description"
                placeholder="Event description"
                rows={3}
              />
              <Header sub color="teal" content="Event Location" />
              <MyTextInput name="city" placeholder="Event city" />
              <MyTextInput name="venue" placeholder="Event venue" />
              <MyDateInput
                name="date"
                placeholderText="Event date"
                timeFormat="HH:mm"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm a"
              />
              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                floated="right"
                positive
                content="Submit"
              />
              <Button
                as={Link}
                to="/events"
                type="submit"
                floated="right"
                content="Cancel"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </Container>
  );
}
