import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import ActionButton from "./ActionButton";
import styles from "../../assets/css/LinkCard.module.scss";
import clsx from "clsx";

const SingleLinkCard = ({
  linkcard: { _id, title, description, status, url },
}) => (
  <div className={styles.container}>
    <Card
      className={clsx(styles.card)}
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
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
                  status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
                // disabled
              >
                {status}
              </Button>
            </Col>
            <Col className={styles.right}>
              <ActionButton url={url} _id={_id}></ActionButton>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text className={styles.text}>{description}</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

export default SingleLinkCard;
