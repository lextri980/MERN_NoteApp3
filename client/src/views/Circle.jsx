import React, { useState } from "react";
import styles from "../assets/css/Circle.module.scss";
import SingleCard from "../components/circle/SingleCard";
import { Button } from "react-bootstrap";

function Circle() {
  //State
  const [randomNumber, setRandomNumber] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  const foods = [
    "Bun ca",
    "Bun bo",
    "Bun Hue",
    "Pho",
    "Xoi",
    "Com ga",
    "Chao suon",
    "Circle K",
    "Banh mi",
    "Lau Gogi (For richkid)",
    "Lau Wang (For richkid)",
    "Lau Phan (For richkid)",
  ];
  const onClick = () => {
    const randomNumber = Math.floor(Math.random() * foods.length);
    setRandomNumber(randomNumber);
    setShowBtn(true);
  };

  let body = null;

  if (showBtn === false) {
    body = (
      <div className={styles.container}>
        <div className={styles.body}>
          <SingleCard foods={foods} />
        </div>
        <div className={styles.btn}>
          <Button
            onClick={onClick}
            className={styles.btnElement}
            variant="secondary"
          >
            Let me choose for your
          </Button>
        </div>
      </div>
    );
  } else if (showBtn === true) {
    body = (
      <div className={styles.container}>
        <div className={styles.body}>
          <SingleCard foods={foods} />
        </div>
        <div className={styles.btn}>
          <Button
            onClick={onClick}
            className={styles.btnElement}
            variant="secondary"
          >
            Let me choose for your
          </Button>
          <Button variant="info">{foods[randomNumber]}</Button>
        </div>
      </div>
    );
  }

  return <>{body}</>;
}

export default Circle;
