import React from "react";
import styles from "../../assets/css/Circle.module.scss";

function SingleCard({foods}) {
  return (
    <>
      {foods.map((food) => (
        <div className={styles.card} key={food}>
          {food}
        </div>
      ))}
    </>
  );
}

export default SingleCard;
