import React from "react";
import {Alert} from "react-bootstrap";
import styles from '../../assets/css/Alert.module.scss'

function AlertMessage({ info }) {
  return info === null ? null : (
    <Alert className={styles.size} variant={info.type}>{info.message}</Alert>
  );
}

export default AlertMessage;
