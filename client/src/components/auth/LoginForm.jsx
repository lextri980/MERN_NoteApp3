import React, { useState, useContext } from "react";
import "../../assets/css/c-Auth.scss";
import { Link } from "react-router-dom";
import AlertMessage from "../layouts/AlertMessage";
//import react-bootstrap
import {Button, Form} from "react-bootstrap";
//import context
import { AuthContext } from "../../contexts/AuthContext";


function LoginForm() {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;

  const [alert, setAlert] = useState(null);


  const onChangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({type: 'danger', message: loginData.message})
        setTimeout(() => setAlert(null), 5000)
      } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={onSubmitLogin}>
        <AlertMessage info={alert}/>
        <Form.Group className="form-box">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="form-box">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
