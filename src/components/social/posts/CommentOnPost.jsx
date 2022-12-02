import { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../common/ErrorMessage";
import useAxios from "../../../hooks/useAxios";
import { Form } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import { SOCIAL_URL } from "../../../constants/Api";
import moment from "moment";

const schema = yup.object().shape({
  body: yup
    .string()
    .required("Comment must contain some text.")
    .min(2, "Minimum 2 characters."),
});

export default function CommentOnPost() {
  const { id } = useParams();
  const commentingUrl = SOCIAL_URL + `posts/${id}/comment`;
  const http = useAxios();
  const [auth] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const options = {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
  };

  useEffect(() => {
    async function FetchComments() {
      const commentsUrl = SOCIAL_URL + `posts/${id}?_comments=true`;
      try {
        const response = await http.get(commentsUrl, options);
        console.log(response);
        const allComments = response.data.comments;
        setComments(allComments);
      } catch (error) {
        setError(error.toString());
        console.log(error.toString());
      } finally {
        setLoading(false);
      }
    }
    FetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitComment(data) {
    setSubmitting(true);
    const formData = {
      body: data.body,
      id: 0,
      /* replyToId: null,
      postId: props.id, */
      owner: auth.name,
    };

    setComments(comments.concat(formData));

    try {
      const response = await http.post(commentingUrl, formData, options);
      console.log(response);
      if (response.status === 200) {
        console.log("Success");
        reset();
      }
    } catch (error) {
      console.log(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong. {error}</p>;
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(submitComment)}
        className="commentOnPostsForm"
      >
        {error && <ErrorMessage>{errors}</ErrorMessage>}
        <fieldset disabled={submitting}>
          <Form.Label htmlFor="comment">Write a comment</Form.Label>
          <Form.Control
            as="textarea"
            name=""
            id="comment"
            rows="2"
            {...register("body")}
          ></Form.Control>

          {errors.message && (
            <ErrorMessage>{errors.comment.message}</ErrorMessage>
          )}
        </fieldset>
        <button
          type="submit"
          className="commentOnPostsForm__submit button mx-auto my-3"
        >
          Send
        </button>
      </Form>
      <div className="postComments">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="postComments__item">
              <Link
                to={`/dashboard/profiles/${[comment.owner]}`}
                className=" m-0"
              >
                by: {comment.owner}
              </Link>
              <p>{moment(comment.created).format("DD MMM YY, hh:mm a")}</p>
              <p>{comment.body}</p>
              <div className="comment_owner"></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
