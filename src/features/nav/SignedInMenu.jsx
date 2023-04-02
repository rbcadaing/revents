import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, Image, Menu } from "semantic-ui-react";
import { signOutUser } from "../auth/authAction";

export default function SignedInMenu() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <DropdownItem
            as={Link}
            to="createEvent"
            text="Create Event"
            icon="plus"
          />
          <DropdownItem text="My Profile" icon="user" />
          <DropdownItem
            onClick={() => {
              dispatch(signOutUser());
              navigate("/");
            }}
            text="Sign out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
