import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import ActionButton from "./ActionButton";
import styles from "../../assets/css/Note.module.scss";
import clsx from "clsx";

const SingleLinkCard = ({
  note: { _id, title, content, status },
}) => (
  <div className={styles.container}>
    <Card
      className={clsx(styles.card)}
      border={
        status === "NORMAL"
          ? "success"
          : status === "HIGHLIGHT"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title className={styles.title}>
          <Row>
            <Col>
              <p>{title}</p>
              <Button
                className={styles.pill}
                variant={
                  status === "NORMAL"
                    ? "success"
                    : status === "HIGHLIGHT"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Button>
            </Col>
            <Col className={styles.right}>
              <ActionButton _id={_id}></ActionButton>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text className={styles.text}>{content}</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

export default SingleLinkCard;
