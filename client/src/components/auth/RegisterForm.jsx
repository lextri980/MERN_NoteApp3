import React, { useContext, useState } from "react";
import "../../assets/css/c-Auth.css";
import { Link } from "react-router-dom";
import AlertMessage from "../layouts/AlertMessage";
//import react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import context
import { AuthContext } from "../../contexts/AuthContext";

function RegisterForm() {
  //Context
  const { registerUser } = useContext(AuthContext);

  //Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, name, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        type: "danger",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={onSubmitRegister}>
        <AlertMessage info={alert} />
        <Form.Group className="form-box">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="form-box">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="form-box">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="form-box">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
