import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import SuccessMessage from "../components/common/SuccessMessage";
import ErrorMessage from "../components/common/ErrorMessage";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  title: yup.string().required("Post must have a title."),
  body: yup.string().required("Post must contain something."),
  media: yup.string(),
  tags: yup.array().ensure(),
});

export default function UpdatePostModal({ id, title, body, media, tags }) {
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updateFormError, setUpdateFormError] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(false);

  const http = useAxios();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const url = `posts/${id}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function updateOwnPost(data) {
    setSubmitting(true);
    setUpdateFormError(null);

    try {
      const response = await http.put(url, data);

      if (response.status === 200) {
        setUpdatedPost(true);
        setTimeout(() => {
          navigate(`/dashboard/posts/${id}`);
        }, 1500);
      }
    } catch (error) {
      setUpdateFormError(error.toString());
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button className="button" onClick={handleShow}>
        Edit
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(updateOwnPost)}>
            {updatedPost && (
              <SuccessMessage>
                <p>The post was updated.</p>
              </SuccessMessage>
            )}
            {updateFormError && (
              <ErrorMessage>
                Something went wrong when trying to update the post.
              </ErrorMessage>
            )}
            <fieldset disabled={submitting}>
              <Form.Label htmlFor="title">New Title</Form.Label>
              <Form.Control
                className=" editPostForm__title"
                type="text"
                id="title"
                {...register("title")}
                defaultValue={title}
              ></Form.Control>
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}

              <Form.Label htmlFor="body">Content</Form.Label>
              <Form.Control
                className="editPostForm__body"
                type="text"
                id="body"
                {...register("body")}
                defaultValue={body}
              ></Form.Control>
              {errors.body && (
                <ErrorMessage>{errors.body.message}</ErrorMessage>
              )}

              <Form.Label htmlFor="media">Image url</Form.Label>
              <Form.Control
                className="editPostForm__media"
                id="media"
                {...register("image")}
                defaultValue={media}
              ></Form.Control>
              {errors.media && (
                <ErrorMessage>{errors.media.message}</ErrorMessage>
              )}

              <Form.Label htmlFor="tags">
                Tags (separate tags with space)
              </Form.Label>
              <Form.Control
                className="editPostForm__tags--info"
                type="text"
                id="tags"
                {...register("tags")}
                defaultValue={tags}
              ></Form.Control>
              {errors.tags && (
                <ErrorMessage>{errors.tags.message}</ErrorMessage>
              )}
            </fieldset>
            <button className="btn btn-success m-3" type="submit">
              {submitting ? "Updating..." : "Update"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

UpdatePostModal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  media: PropTypes.string,
  tags: PropTypes.array,
};
