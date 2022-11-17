/* In this form we need to fetch the datas from the post into a form.
We must use the delete method together with the correct url by using axios.
It also needs a yup schema for validating the input fields so it follows the same syntax from when creating a post.
We also need prop-types and error messages. */

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import ErrorMessage from "../components/common/ErrorMessage";

const schema = yup.object().shape({
  title: yup.string().required("Required field."),
  body: yup.string().required("Required field."),
});

export default function UpdatePostModal({ id, title, body }) {
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registerFormError, setRegisterFormError] = useState(null);

  const http = useAxios();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //test code below
  function refreshAfterSubmit() {
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  }
  //test code above

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function updateOwnPost(data) {
    setSubmitting(true);
    setRegisterFormError(null);

    try {
      const response = await http.put(`posts/${id}`, data);
      console.log(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(updateOwnPost)}>
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
