import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Modal, Button, Form } from "react-bootstrap";
// import styles from "../../assets/css/Note.module.scss";
import styles from '../../assets/css/Profile.module.scss'
import clsx from "clsx";
import usernameIcon from "../../assets/icon/username.png";
import nameIcon from "../../assets/icon/name.png";
import passwordIcon from "../../assets/icon/password.png";

function UpdateModal() {
  //Context
  const {
    authState: { user },
    updateModal,
    setUpdateModal,
    updateProfile,
    setToast,
  } = useContext(AuthContext);

  //State
  const [newProfile, setNewProfile] = useState(user);

  const { username, name, password } = newProfile;

  const onChange = (e) => {
    setNewProfile({
      ...newProfile,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updateProfile(newProfile);
    closeModal();
    setToast({ show: true, message, type: success ? "success" : "danger" });
    window.setTimeout(function () {
      window.location.reload();
    }, 3000);
  };

  const closeModal = () => {
    setUpdateModal(false);
    setNewProfile(user);
  };

  return (
    <Modal show={updateModal} className={styles.middle} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>
          After update, wait 3 senconds to change your infomation!
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className={clsx(styles.spaceInput, styles.formGroup)}>
            <img src={usernameIcon} alt="username" width="30" height="30" />
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
              area-aria-describedby="title-help"
            />
          </Form.Group>
          <Form.Group className={clsx(styles.spaceInput, styles.formGroup)}>
            <img src={nameIcon} alt="name" width="30" height="30" />
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className={clsx(styles.spaceInput, styles.formGroup)}>
            <img src={passwordIcon} alt="password" width="30" height="30" />
            <Form.Control
              type="text"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="info" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdateModal;
