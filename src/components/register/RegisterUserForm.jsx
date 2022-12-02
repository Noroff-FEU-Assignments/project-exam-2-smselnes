import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, REGISTER_URL } from "../../constants/Api";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";
import { Form } from "react-bootstrap";

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Minimum 8 characters.")
    .required("Please enter full name")
    .matches(usernameRegex, "No punctuation except underscore."),
  email: yup
    .string()
    .required("Please enter your email")
    .email()
    .matches(
      emailRegex,
      "Email must be a valid stud.noroff.no or noroff.no mail address."
    ),
  password: yup.string().required("Please enter a password"),

  avatar: yup.string(),
  banner: yup.string(),
});

export default function RegisterUserForm() {
  const [submitting, setSubmitting] = useState(false);
  const [registerFormError, setRegisterFormError] = useState(null);
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerUrl = BASE_URL + REGISTER_URL;

  async function registerFormSubmit(data) {
    setSubmitting(true);
    setRegisterFormError(null);

    const formData = JSON.stringify(data);

    const options = {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(registerUrl, options);
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setRegistered(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setRegisterFormError("Invalid credentials / account already exists?");
      }
    } catch (error) {
      console.log("Error:", error);
      setRegisterFormError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="text-center m-3">Register user</h1>

      <Form
        onSubmit={handleSubmit(registerFormSubmit)}
        className="registerUserForm mb-3"
      >
        <fieldset disabled={submitting}>
          {registered && (
            <SuccessMessage>
              <p>New user created</p>
            </SuccessMessage>
          )}
          {registerFormError && (
            <ErrorMessage>{registerFormError}</ErrorMessage>
          )}
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>* Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              {...register("name")}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>* Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="email"
              {...register("email")}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>* Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="choose a password"
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </Form.Group>

          <Form.Group controlId="avatar" className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="url"
              placeholder="avatar url"
              {...register("avatar")}
            />
            {errors.avatar && (
              <ErrorMessage>{errors.avatar.message}</ErrorMessage>
            )}
          </Form.Group>
          <Form.Group controlId="banner" className="mb-3">
            <Form.Label>Banner</Form.Label>
            <Form.Control
              type="url"
              placeholder="banner url"
              {...register("banner")}
            />
            {errors.banner && (
              <ErrorMessage>{errors.banner.message}</ErrorMessage>
            )}
          </Form.Group>
        </fieldset>
        <button type="submit" className="registerUserForm__button mb-3">
          {submitting ? "Registering" : "Register"}
        </button>
        <hr />
        <p className="registerUserForm__description">* = required fields</p>
        <p className="registerUserForm__description">
          avatar and banner images are optional and can be added or changed
          later in your profile settings.
        </p>
      </Form>
    </>
  );
}
