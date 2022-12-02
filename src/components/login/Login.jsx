import { LOGIN_URL, BASE_URL } from "../../constants/Api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";
import AuthContext from "../../context/AuthContext";
import { Form } from "react-bootstrap";

const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email must be a valid stud.noroff.no or noroff.no mail address.")
    .email()
    .matches(
      emailRegex,
      "Email must be a valid stud.noroff.no or noroff.no mail address."
    ),
  password: yup.string().required("Invalid login credentials"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginUrl = BASE_URL + LOGIN_URL;

  async function loginSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    const loginData = JSON.stringify(data);

    const options = {
      method: "POST",
      body: loginData,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(loginUrl, options);
      const json = await response.json();
      console.log(response);
      if (response.ok) {
        setLoggedIn(true);
        setAuth(json);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoginError(
          "There was a problem when logging in. Are you sure you have the correct password?"
        );
      }
    } catch (error) {
      console.log("Error:", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="loginForm__heading m-3">Log in to the community</h1>

      <Form onSubmit={handleSubmit(loginSubmit)} className="loginForm">
        {loggedIn && (
          <SuccessMessage>
            <p>Successfully logged in!</p>
          </SuccessMessage>
        )}
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </Form.Group>
        </fieldset>
        <button
          variant="primary"
          type="submit"
          className="button loginForm__button"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
        <hr />
        <p className="loginForm__description">
          only accounts with a <span>stud.noroff.no</span> or{" "}
          <span>noroff.no</span> email can log in to the community
        </p>
      </Form>
    </>
  );
}
