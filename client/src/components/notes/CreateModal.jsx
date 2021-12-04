import React, { useContext, useState } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../../assets/css/Note.module.scss";

function CreateModal() {
  //Context
  const { addModal, setAddModal, createNote, setToast } = useContext(NoteContext);

  //State
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    status: "NORMAL",
  });

  const { title, content, status } = newNote;

  const onChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await createNote(newNote);
    closeModal()
    setToast({show: true, message, type: success ? 'success' : 'danger'})
  };

  const closeModal = () => {
    setAddModal(false);
    setNewNote({
      title: "",
      content: "",
      status: "NORMAL",
    });
  };

  return (
    <Modal show={addModal} className={styles.middle} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>What do you want to note?</Modal.Title>
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
              as="textarea"
              rows={5}
              placeholder="Content"
              name="content"
              value={content}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              as='select'
              placeholder="Status"
              name="status"
              value={status}
              onChange={onChange}
              required
            >
              <option value="NORMAL">Normal</option>
              <option value="HIGHLIGHT">Highlight</option>
              <option value="IMPORTANT">Important</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="info" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateModal;

