import React, { useContext } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import styles from "../assets/css/Profile.module.scss";
import UpdateModal from "../components/profiles/UpdateModal";
// import clsx from 'clsx'
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import usernameIcon from "../assets/icon/username.png";
import nameIcon from "../assets/icon/name.png";
import passwordIcon from "../assets/icon/password.png";

function Profile() {
  //Context
  const {
    authState: {
      user: { username, name },
    },
  } = useContext(AuthContext);

  // const {
  //   profileState: { profile },
  //   setUpdateModal,
  //   toast: { type, message, show },
  //   setToast,
  // } = useContext(ProfileContext);

  const body = (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h2>Profile</h2>

        <Form className={styles.form}>
          <Form.Group className={styles.formInput}>
            <img src={usernameIcon} alt="username" width="30" height="30" />
            <Form.Control type="text" placeholder={username} disabled />
          </Form.Group>
          <Form.Group className={styles.formInput}>
            <img src={nameIcon} alt="name" width="30" height="30" />
            <Form.Control type="text" placeholder={name} disabled />
          </Form.Group>
          <Form.Group className={styles.formInput}>
            <img src={passwordIcon} alt="name" width="30" height="30" />
            <Form.Control
              type="text"
              placeholder="Click update to see detail"
              disabled
            />
          </Form.Group>
          <Button className={styles.btn} onClick={UpdateModal.bind(this, true)}>Update</Button>
        </Form>
      </div>
    </div>
  );

  return (
    <>
      {body}
      {/* <UpdateModal/> */}

      {/* Show Toast */}
      {/* <Toast
        className={`bg-${type} text-white`}
        show={show}
        style={{
          position: "fixed",
          top: "10%",
          right: "20px",
          width: "250px",
          padding: "7px 10px",
        }}
        onClose={setToast.bind(this, { show: false, type: null, message: "" })}
        delay={5000}
        autohide
      >
        <strong>{message}</strong>
      </Toast> */}
    </>
  );
}

export default Profile;
