import { base_url, login_path } from "../../utils/Api";
import { userToken } from "../../utils/Api";

const url = base_url + "api/v1/social/profiles";

export default function LoginForm() {
  async function getPosts() {
    const options = {
      headers: {
        Authorization: `${userToken}`,
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }

  getPosts();

  return <div>LoginForm</div>;
}

/* import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { base_url, login_path } from "../../utils/Api";

import React from "react";

export default function LoginForm() {
  const [submittingForm, setSubmittingForm] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setSubmittingForm(true);
    setLoginError(null);
    console.log(data);


  }

  return <div>LoginForm</div>;
} */

/* const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
  },
}
const response = await fetch(`${API_BASE_URL}/api/v1/social/posts`, options)
const data = await response.json() */
