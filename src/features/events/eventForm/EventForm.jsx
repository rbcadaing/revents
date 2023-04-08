/* global google */
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Button, Confirm, Container, Header, Segment } from "semantic-ui-react";
import { listenToEvents } from "../eventActions";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function EventForm() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === id)
  );

  const { loading } = useSelector((state) => state.async);
  //null conditional value
  let initialValues = {};
  if (selectedEvent === null || selectedEvent === undefined) {
    initialValues = {
      title: "",
      category: "",
      description: "",
      city: {
        address: "",
        latLng: null,
      },
      venue: {
        address: "",
        latLng: null,
      },
      date: "",
    };
  } else {
    initialValues = selectedEvent;
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title!"),
    category: Yup.string().required("You must provide a category!"),
    description: Yup.string().required("You must provide a description!"),
    city: Yup.object().shape({
      address: Yup.string().required("City is required"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Venue is required"),
    }),
    date: Yup.string().required("You must provide a date!"),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: id === undefined || null || !!id ? false : true,
    query: () => listenToEventFromFirestore(id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading Event ..." />;

  return (
    <Container className="main">
      <Segment clearing>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              selectedEvent
                ? // ? dispatch(updateEvent({ ...selectedEvent, ...values }))
                  await updateEventInFirestore(values)
                : await addEventToFirestore(values);
              setSubmitting(false);
              navigate("/events");
            } catch (error) {
              toast.error(error.message);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, dirty, isValid, values }) => (
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
              <MyPlaceInput name="city" placeholder="Event city" />
              <MyPlaceInput
                name="venue"
                disabled={!values.city.latLng}
                placeholder="Event venue"
                options={{
                  location: new google.maps.LatLng(values.city.latLng),
                  radius: 1000,
                  types: ["establishment"],
                }}
              />
              <MyDateInput
                name="date"
                placeholderText="Event date"
                timeFormat="HH:mm"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm a"
              />
              {selectedEvent && (
                <Button
                  loading={loadingCancel}
                  type="button"
                  floated="left"
                  color={selectedEvent.isCancelled ? "green" : "red"}
                  content={
                    selectedEvent.isCancelled
                      ? "Reactivate Event"
                      : "Cancel Event"
                  }
                  onClick={() => setConfirmOpen(true)}
                />
              )}
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
        <Confirm
          content={
            selectedEvent?.isCancelled
              ? "This will reactivate the event - are you sure?"
              : "This will cancel the event - are you sure?"
          }
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => handleCancelToggle(selectedEvent)}
        />
      </Segment>
    </Container>
  );
}
