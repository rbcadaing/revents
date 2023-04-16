import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown, DropdownItem, Image, Menu } from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";

export default function SignedInMenu() {
  const navigate = useNavigate();
  const { currentUserProfile } = useSelector((state) => state.profile);

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
        src={currentUserProfile?.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
        <Dropdown.Menu>
          <DropdownItem
            as={Link}
            to="createEvent"
            text="Create Event"
            icon="plus"
          />
          <DropdownItem
            text="My Profile"
            as={Link}
            to={`/users/profile/${currentUserProfile?.id}`}
            icon="user"
          />
          <DropdownItem
            as={Link}
            to="/users/account"
            text="My account"
            icon="settings"
          />
          <DropdownItem onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
