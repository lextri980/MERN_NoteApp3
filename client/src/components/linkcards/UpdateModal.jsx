import React, { useContext, useState, useEffect } from "react";
import { LinkCardContext } from "../../contexts/LinkCardContext";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../../assets/css/LinkCard.module.scss";

function UpdateModal() {
  //Context
  const {
    linkCardState: { linkcard },
    updateModal,
    setUpdateModal,
    updateLinkCard,
    setToast,
  } = useContext(LinkCardContext);

  //State
  const [newLinkcard, setNewLinkcard] = useState(linkcard);

  useEffect(() => setNewLinkcard(linkcard), [linkcard]);

  const { title, description, url, status } = newLinkcard;

  const onChange = (e) => {
    setNewLinkcard({
      ...newLinkcard,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updateLinkCard(newLinkcard);
    closeModal();
    setToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const closeModal = () => {
    setUpdateModal(false);
    setNewLinkcard(linkcard);
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
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              type="text"
              placeholder="Tutorial url"
              name="url"
              value={url}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className={styles.spaceInput}>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChange}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
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

export default UpdateModal;
