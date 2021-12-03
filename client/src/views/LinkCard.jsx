/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import styles from "../assets/css/LinkCard.module.scss";
import { LinkCardContext } from "../contexts/LinkCardContext";
import { AuthContext } from "../contexts/AuthContext";
import SingleLinkCard from "../components/linkcards/SingleLinkCard";
import addIcon from "../assets/icon/add.png";
import { Spinner, Card, Button, Row, Col, Toast } from "react-bootstrap";
import clsx from "clsx";
import CreateModal from "../components/linkcards/CreateModal";
import UpdateModal from "../components/linkcards/UpdateModal";

function LinkCard() {
  //Context
  const {
    authState: {
      user: { name },
    },
  } = useContext(AuthContext);

  const {
    linkCardState: { linkcard, linkcards, linkcardsLoading },
    getLinkCard,
    setAddModal,
    toast: { show, type, message },
    setToast,
  } = useContext(LinkCardContext);

  useEffect(() => getLinkCard(), []);

  let body = null;

  if (linkcardsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="grow" variant="info" />
      </div>
    );
  } else if (linkcards.length === 0) {
    body = (
      <>
        <div className={styles.centerDiv}>
          <Card className={clsx(styles.card)}>
            <Card.Header as="h1">Hi {name}</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to Note App</Card.Title>
              <Card.Text>
                Click the button below to create the new card
              </Card.Text>
              <Button className={styles.blueBtn} onClick={setAddModal.bind(this, true)}>New Card</Button>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <Row className={styles.display}>
          {linkcards.map((linkcard) => (
            <Col key={linkcard._id}>
              <SingleLinkCard linkcard={linkcard} />
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
      {linkcard !== null && <UpdateModal/>}

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

export default LinkCard;
