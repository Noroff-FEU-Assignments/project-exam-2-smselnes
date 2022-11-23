import Modal from "react-bootstrap/Modal";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import SuccessMessage from "../components/common/SuccessMessage";
import ErrorMessage from "../components/common/ErrorMessage";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Required field."),
  body: yup.string().required("Required field."),
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
      const response = await http.put(`posts/${id}`, data);
      console.log(response.data);

      if (response.status === 200) {
        setUpdatedPost(true);
        navigate(`/dashboard/posts/${id}`);
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
          <form onSubmit={handleSubmit(updateOwnPost)}>
            {updatedPost && (
              <SuccessMessage>
                <p>The post was updated.</p>
              </SuccessMessage>
            )}
            {updateFormError && <ErrorMessage>{updateFormError}</ErrorMessage>}
            <fieldset disabled={submitting}>
              <div>
                <label htmlFor="title">New title</label>
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  defaultValue={title}
                />
                {errors.title && (
                  <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label htmlFor="body">Post content</label>
                <input
                  type="text"
                  id="body"
                  {...register("body")}
                  defaultValue={body}
                />
                {errors.body && (
                  <ErrorMessage>{errors.body.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label htmlFor="media">Image url</label>
                <input type="text" id="media" {...register("media")} />
                {errors.media && (
                  <ErrorMessage>{errors.media.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  {...register("tags")}
                  defaultValue={tags}
                />
                {errors.tags && (
                  <ErrorMessage>{errors.tags.message}</ErrorMessage>
                )}
              </div>
            </fieldset>
            <button className="btn btn-success m-3" type="submit">
              {submitting ? "Updating..." : "Update"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
