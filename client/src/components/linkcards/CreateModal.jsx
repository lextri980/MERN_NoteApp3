import React, { useContext, useState } from "react";
import { LinkCardContext } from "../../contexts/LinkCardContext";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../../assets/css/LinkCard.module.scss";

function CreateModal() {
  //Context
  const { addModal, setAddModal, createLinkCard, setToast } = useContext(LinkCardContext);

  //State
  const [newLinkcard, setNewLinkcard] = useState({
    title: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, url } = newLinkcard;

  const onChange = (e) => {
    setNewLinkcard({
      ...newLinkcard,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await createLinkCard(newLinkcard);
    closeModal()
    setToast({show: true, message, type: success ? 'success' : 'danger'})
  };

  const closeModal = () => {
    setAddModal(false);
    setNewLinkcard({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
  };

  return (
    <Modal show={addModal} className={styles.middle} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>What do you want to learn?</Modal.Title>
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
              placeholder="Tutorial url"
              name="url"
              value={url}
              onChange={onChange}
              required
            />
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
