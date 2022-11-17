import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../common/ErrorMessage";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Must have a title."),
  body: yup
    .string()
    .required("Must have a description.")
    .min(5, "Minimum 5 characters."),
  image: yup.string().url("Must be a valid url"),
});

export default function CreateNewPost() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  async function submitNewPost(data) {
    setSubmitting(true);
    setError(null);
    console.log(data);

    const title = data.title;
    const body = data.body;
    const image = data.image;

    const formData = {
      title: title,
      body: body,
      media: image,
    };

    try {
      const response = await http.post(`posts`, JSON.stringify(formData));
      navigate("/dashboard/posts");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitNewPost)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <fieldset disabled={submitting}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" {...register("title")} />
          {errors.message && (
            <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="body">Description</label>
          <input type="text" id="body" {...register("body")}></input>
          {errors.message && <ErrorMessage>{errors.body.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="media">Image Url:</label>
          <input id="media" {...register("image")} />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </div>
        <button>{submitting ? "Adding post..." : "Add"}</button>
      </fieldset>
    </form>
  );
}