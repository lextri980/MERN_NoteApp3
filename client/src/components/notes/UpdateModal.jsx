import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../../assets/css/Note.module.scss";

function UpdateModal() {
  //Context
  const {
    noteState: { note },
    updateModal,
    setUpdateModal,
    updateNote,
    setToast,
  } = useContext(NoteContext);

  //State
  const [newNote, setNewNote] = useState(note);

  useEffect(() => setNewNote(note), [note]);

  const { title, content, status } = newNote;

  const onChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updateNote(newNote);
    closeModal();
    setToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const closeModal = () => {
    setUpdateModal(false);
    setNewNote(note);
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
              placeholder="Title"
              name="title"
              value={title}
              onChange={onChange}
              required
              area-aria-describedby="title-help"
            />
          </Form.Group>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              type="text"
              placeholder="Content"
              name="content"
              value={content}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChange}
            >
              <option value="NORMAL">NORMAL</option>
              <option value="HIGHLIGHT">HIGHLIGHT</option>
              <option value="IMPORTANT">IMPORTANT</option>
            </Form.Control>
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
