import useAxios from "../hooks/useAxios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ErrorMessage from "../components/common/ErrorMessage";

const schema = yup.object().shape({
  title: yup.string().required("Must have a title"),
  body: yup.string().required("Must have some text content"),
  image: yup.string().url(),
});

export default function CreateNewPost() {
  const [submitting, setSubmitting] = useState(false);
  const [registerFormError, setRegisterFormError] = useState(null);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  async function submitNewPost(data) {
    setSubmitting(true);
    setRegisterFormError(null);
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
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setRegisterFormError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create new post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(submitNewPost)}>
            {registerFormError && (
              <ErrorMessage>{registerFormError}</ErrorMessage>
            )}
            <fieldset disabled={submitting}>
              <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" {...register("title")} />
                {errors.title && (
                  <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label htmlFor="body">Content</label>
                <input type="text" id="body" {...register("body")} />
                {errors.body && (
                  <ErrorMessage>{errors.body.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label htmlFor="media">Image url</label>
                <input id="media" {...register("image")} />
                {errors.image && (
                  <ErrorMessage>{errors.media.message}</ErrorMessage>
                )}
              </div>
            </fieldset>
            <button
              className="btn btn-success m-3"
              type="submit"
              onClick={refreshAfterSubmit}
            >
              {submitting ? "Creating" : "Create"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
