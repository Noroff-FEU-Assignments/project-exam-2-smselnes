import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../common/ErrorMessage";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  body: yup
    .string()
    .required("Comment must contain some text.")
    .min(2, "Minimum 2 characters."),
});

export default function CommentOnPost() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  let { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  async function submitComment(data) {
    setSubmitting(true);
    setError(null);
    console.log(data);

    const body = data.body;

    const formData = {
      body: body,
    };

    try {
      const response = await http.post(
        `posts/${id}/comment`,
        JSON.stringify(formData)
      );
      console.log(response.data);
      navigate(`/dashboard/posts/${id}`);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  if (error) {
    return (
      <div className="errorMessage">
        <p>Error: There was an unexpected error.</p>
        <p>Advanced: {error}</p>
      </div>
    );
  }
  //need to decide whether to use textarea or input:text in comments section.
  return (
    <form onSubmit={handleSubmit(submitComment)}>
      {error && <ErrorMessage>{errors}</ErrorMessage>}
      <fieldset disabled={submitting}>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            name=""
            id="comment"
            cols="30"
            rows="2"
            {...register("body")}
          ></textarea>
          {/*  <input type="text" id="comment" {...register("body")} /> */}
          {errors.message && (
            <ErrorMessage>{errors.comment.message}</ErrorMessage>
          )}
        </div>
        <button>Place comment</button>
      </fieldset>
    </form>
  );
}
