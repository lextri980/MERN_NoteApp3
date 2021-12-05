import React from "react";
import styles from "../assets/css/Author.module.scss";
import { Button } from "react-bootstrap";

function Author() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>

      <strong>This is information of person creating this website</strong>
      
        <p className={styles.p}>Name: Le Xuan Tri</p>
        <p>SID: 1801040228</p>
        <p>Class: 6C18</p>
        <p>Tutorial class: EIS01</p>
      

      </div>
      <Button href="https://www.facebook.com/lextri980/" target='_blank' variant='info' className={styles.btn}>Facebook</Button>
    </div>
  );
}

export default Author;
