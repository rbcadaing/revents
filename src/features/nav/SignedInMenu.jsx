import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown, DropdownItem, Image, Menu } from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";

export default function SignedInMenu() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  async function handleSignOut() {
    try {
      navigate("/");
      await signOutFirebase();
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.displayName}>
        <Dropdown.Menu>
          <DropdownItem
            as={Link}
            to="createEvent"
            text="Create Event"
            icon="plus"
          />
          <DropdownItem text="My Profile" icon="user" />
          <DropdownItem
            as={Link}
            to="/account"
            text="My account"
            icon="settings"
          />
          <DropdownItem onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
