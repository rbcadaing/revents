import React from "react";
import { Route, Routes } from "react-router-dom";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomPage";
import NavBar from "../../features/nav/NavBar";
import "./styles.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/events" element={<NavBar />}>
          <Route index element={<EventDashboard />} />
          <Route path=":id" element={<EventDetailedPage />} />
          {["createEvent", "manage/:id"].map((path) => (
            <Route key="events" path={path} Component={EventForm} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
