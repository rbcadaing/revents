import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomPage";
import NavBar from "../../features/nav/NavBar";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import "./styles.css";

function App() {
  const { key } = useLocation();
  return (
    <>
      <ModalManager />
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route exact path="/sandbox" element={<Sandbox />} />
        <Route path="/events" element={<NavBar />}>
          <Route index element={<EventDashboard />} />

          <Route path=":id" element={<EventDetailedPage />} />
          {["createEvent", "manage/:id"].map((path) => (
            <Route path={path} Component={EventForm} key={key} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
