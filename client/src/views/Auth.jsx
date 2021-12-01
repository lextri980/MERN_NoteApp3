import React, { useContext } from "react";
import styles from "../assets/css/v-Auth.module.scss";
import { Redirect } from "react-router-dom";
//import react-bootstrap
import {Spinner} from "react-bootstrap";
//import component
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
//import context
import { AuthContext } from "../contexts/AuthContext";

function Auth({ authRoute }) {
  //Context
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="grow" variant="info" />
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/linkcard" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className={styles.h1}>Note App</h1>
          <h4 className={styles.h4}>Save everything you want</h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
