import { login_path, base_url } from "../../utils/Api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../common/ErrorMessage";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .email()
    .matches(
      emailRegex,
      "Email must be a valid stud.noroff.no or noroff.no mail address."
    ),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Minimum 8 characters."),
});

export default function Login() {
  const [login, setLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const [auth, setAuth] = useContext(AuthContext);

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
      console.log(json);
      console.log(auth);
      //setAuth(json.accessToken);

      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
      setLoginError(error.toString());
    } finally {
      setLogin(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(loginSubmit)}>
      <fieldset disabled={login}>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" {...register("password")} />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
      </fieldset>
      <button type="submit">{login ? "Logging in..." : "Login"}</button>
    </form>
  );
}
