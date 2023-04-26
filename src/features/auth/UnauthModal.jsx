import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Divider, Modal} from "semantic-ui-react";
import {openModal} from "../../app/common/modals/modalReducer";
import {useNavigate} from "react-router-dom";

export default function UnauthModal({setModalOpen}) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClose() {
    setOpen(false);

    if (setModalOpen !== undefined && !setModalOpen) {
      setModalOpen(false);
      navigate(-1);
    } else {
      navigate(-1);
    }
  }

  function handleOpenLoginModal(modalType) {
    dispatch(openModal({modalType}));
    setOpen(false);
    if (setModalOpen !== undefined && !setModalOpen) {
      setModalOpen(false);
    }
  }

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content="you need to be signed in to do that" />
      <Modal.Content>
        <p> please either login or register to seee this content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content="login"
            onClick={() => handleOpenLoginModal("LoginForm")}
          />
          <Button.Or />
          <Button
            fluid
            color="green"
            content="register"
            onClick={() => dispatch(openModal({modalType: "RegisterForm"}))}
          />
        </Button.Group>
        <Divider />
        <div style={{textAlign: "center"}}>
          <p>Or click cancel to continue as a guest</p>
          <Button onClick={handleClose} content="Cancel" />
        </div>
      </Modal.Content>
    </Modal>
  );
}
