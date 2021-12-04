import React, { useState } from "react";
import styles from "../assets/css/Circle.module.scss";
import SingleCard from "../components/circle/SingleCard";
import { Button } from "react-bootstrap";

function Circle() {
  const [randomNumber, setRandomNumber] = useState(0);

  const foods = [
    'Bun ca',
    "Bun bo",
    "Bun Hue",
    "Pho",
    "Xoi",
    "Xien ban",
    "Link Cute",
    "Circle K",
    "Banh mi",
    "Lau Gogi",
    "Lau Wang",
    "Lau Phan",
  ];

  const onClick = () => {
    const randomNumber = Math.floor(Math.random() * foods.length);
    setRandomNumber(randomNumber);
    console.log(foods[randomNumber]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <SingleCard foods={foods} />
      </div>
      <div className={styles.btn}>
        <Button onClick={onClick}>Let me choose for your</Button>
      </div>
    </div>
  );
}

export default Circle;
