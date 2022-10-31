import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { base_url, register_path } from "../../utils/Api";
import ErrorMessage from "../common/ErrorMessage";

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
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Minimum 8 characters."),
  avatar: yup.string(),
  banner: yup.string(),
});

export default function RegisterUserForm() {
  const [submitting, setSubmitting] = useState(false);
  const [registerFormError, setRegisterFormError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerUrl = base_url + register_path;

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
        navigate("/login");
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

      <form onSubmit={handleSubmit(registerFormSubmit)}>
        <fieldset disabled={submitting}>
          {registerFormError && (
            <ErrorMessage>{registerFormError}</ErrorMessage>
          )}
          <div>
            <label htmlFor="name">Name *</label>
            <input id="name" {...register("name")} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="email">Email *</label>
            <input id="email" {...register("email")} />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="password">Password *</label>
            <input id="password" {...register("password")} />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="avatar">Avatar:</label>
            <input id="avatar" {...register("avatar")} />
            {errors.avatar && (
              <ErrorMessage>{errors.avatar.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="banner">Banner:</label>
            <input id="banner" {...register("banner")} />
            {errors.banner && (
              <ErrorMessage>{errors.banner.message}</ErrorMessage>
            )}
          </div>
          <button type="submit">
            {submitting ? "Registering" : "Register"}{" "}
          </button>
        </fieldset>
      </form>
    </>
  );
}
