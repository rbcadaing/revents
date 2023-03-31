import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false);
    navigate("/");
  }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" header>
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "15px" }}
            />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          {authenticated && (
            <Menu.Item as={NavLink} to="/events/createEvent">
              <Button positive inverted content="Create Event"></Button>
            </Menu.Item>
          )}
          {authenticated ? (
            <SignedInMenu signOut={handleSignOut} />
          ) : (
            <SignedOutMenu setAuthenticated={setAuthenticated} />
          )}
        </Container>
      </Menu>
      <Outlet />
    </div>
  );
}
