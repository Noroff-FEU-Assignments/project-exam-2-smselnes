import Modal from "react-bootstrap/Modal";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import SuccessMessage from "../components/common/SuccessMessage";
import ErrorMessage from "../components/common/ErrorMessage";
import refreshAfterSubmit from "../components/common/RefreshAfterSubmit";

const schema = yup.object().shape({
  title: yup.string().required("Required field."),
  body: yup.string().required("Required field."),
});

export default function UpdatePostModal({ id, title, body }) {
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registerFormError, setRegisterFormError] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(false);

  const http = useAxios();

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
    setUpdatedPost(true);
    setSubmitting(true);
    setRegisterFormError(null);

    try {
      const response = await http.put(`posts/${id}`, data);
      console.log(response.data);
    } catch (error) {
      setRegisterFormError(error.toString());
      console.log(error);
    } finally {
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
            {registerFormError && (
              <ErrorMessage>{registerFormError}</ErrorMessage>
            )}
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
            </fieldset>
            <button
              className="btn btn-success m-3"
              type="submit"
              onClick={refreshAfterSubmit}
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
