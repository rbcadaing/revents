import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AccountPage from "../../features/auth/AccountPage";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomPage";
import NavBar from "../../features/nav/NavBar";
import Sandbox from "../../features/sandbox/Sandbox";
import ErrorComponent from "../common/errors/ErrorComponent";
import ModalManager from "../common/modals/ModalManager";
import "./styles.css";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);
  if (!initialized) return <LoadingComponent content="Loading app..." />;
  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" theme="colored" hideProgressBar />
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route exact path="/sandbox" element={<Sandbox />} />
        <Route path="/error" Component={ErrorComponent} />
        <Route path="/events" element={<NavBar />}>
          <Route index element={<EventDashboard />} />
          <Route path=":id" element={<EventDetailedPage />} />
          {["createEvent", "manage/:id"].map((path) => (
            <Route path={path} Component={EventForm} key={key} />
          ))}
        </Route>
        <Route path="/users" element={<NavBar />}>
          <Route path="account" element={<AccountPage />} />
          <Route path="profile/:id" Component={ProfilePage} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
