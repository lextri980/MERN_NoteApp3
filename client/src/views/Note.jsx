/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import styles from "../assets/css/Note.module.scss";
import { NoteContext } from "../contexts/NoteContext";
import { AuthContext } from "../contexts/AuthContext";
import addIcon from "../assets/icon/add.png";
import { Spinner, Card, Button, Row, Col, Toast } from "react-bootstrap";
import clsx from "clsx";
import SingleNote from "../components/notes/SingleNote";
import CreateModal from "../components/notes/CreateModal";
import UpdateModal from "../components/notes/UpdateModal";

function Note() {
  //Context
  const {
    authState: {
      user: { name },
    },
  } = useContext(AuthContext);
  const {
    noteState: { noteLoading, notes, note },
    getNote,
    setAddModal,
    toast:{type, message, show},
    setToast
  } = useContext(NoteContext);

  useEffect(() => getNote(), []);

  let body = null;

  if (noteLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="grow" variant="info" />
      </div>
    );
  } else if (notes.length === 0) {
    body = (
      <>
        <div className={styles.centerDiv}>
          <Card className={clsx(styles.card)}>
            <Card.Header as="h1">Hi {name}</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to Note App</Card.Title>
              <Card.Text>
                Click the button below to create the new note
              </Card.Text>
              <Button
                className={styles.blueBtn}
                onClick={setAddModal.bind(this, true)}
              >
                New Note
              </Button>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <Row className={styles.display}>
          {notes.map((note) => (
            <Col key={note._id}>
              <SingleNote note={note} />
            </Col>
          ))}
        </Row>

        <Button className="btn-floating" onClick={setAddModal.bind(this, true)}>
          <img src={addIcon} alt="create" width="50" height="50" />
        </Button>
      </>
    );
  }
  return (
    <>
      {body}
      <CreateModal />
      {note !== null && <UpdateModal/>}

      {/* Show Toast */}
      <Toast
        className={`bg-${type} text-white`}
        show={show}
        style={{
          position: "fixed",
          top: "10%",
          right: "20px",
          width: "250px",
          padding: "7px 10px",
        }}
        onClose={setToast.bind(this, {show: false, type: null, message: ''})}
        delay={5000}
        autohide
      >
        <strong>{message}</strong>
      </Toast>
    </>
  );
}

export default Note;
