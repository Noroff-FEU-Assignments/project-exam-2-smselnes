import { login_path, base_url } from "../../utils/Api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../common/ErrorMessage";
import { useContext } from "react";
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
  const [login, setLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const [, /* auth */ setAuth] = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginUrl = base_url + login_path;

  async function loginSubmit(data) {
    setLogin(true);
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
      setAuth(json);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
      setLoginError(error.toString());
    } finally {
      setLogin(false);
    }
  }

  return (
    <>
      <h1 className="loginForm__heading m-3">Log in to the community</h1>

      <Form onSubmit={handleSubmit(loginSubmit)} className="loginForm">
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <fieldset disabled={login}>
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
          {login ? "Logging in..." : "Login"}
        </button>
      </Form>
    </>
  );
}
