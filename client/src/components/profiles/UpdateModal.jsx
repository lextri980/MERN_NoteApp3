import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../../assets/css/Note.module.scss";

function UpdateModal() {
  //Context
  const {
    profileState: { profile },
    updateModal,
    setUpdateModal,
    updateProfile,
    setToast,
  } = useContext(ProfileContext);

  //State
  const [newProfile, setNewProfile] = useState(profile);

  useEffect(() => setNewProfile(profile), [profile]);

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
  };

  const closeModal = () => {
    setUpdateModal(false);
    setNewProfile(profile);
  };

  return (
    <Modal show={updateModal} className={styles.middle} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Making process?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
              area-aria-describedby="title-help"
            />
          </Form.Group>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              type='text'
              placeholder='Password'
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
