import useAxios from "../hooks/useAxios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorMessage from "../components/common/ErrorMessage";
import SuccessMessage from "../components/common/SuccessMessage";
import refreshAfterSubmit from "../components/common/RefreshAfterSubmit";

const schema = yup.object().shape({
  title: yup.string().required("Must have a title"),
  body: yup.string().required("Must have some text content"),
  image: yup.string().url(),
  tags: yup.string(),
});

export default function CreateNewPost() {
  const [submitting, setSubmitting] = useState(false);
  const [registerFormError, setRegisterFormError] = useState(null);
  const [createPost, setCreatePost] = useState(false);
  const [show, setShow] = useState(false);
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function submitNewPost(data, e) {
    const postTags = data.tags;
    const formattedTags = postTags.split(" ");
    setSubmitting(true);
    setRegisterFormError(null);

    const formData = {
      title: data.title,
      body: data.body,
      media: data.image,
      tags: formattedTags,
    };

    try {
      const response = await http.post(`posts`, JSON.stringify(formData));
      console.log(response.data);
      setCreatePost(true);
      e.target.reset();
      refreshAfterSubmit();
    } catch (error) {
      console.log(error);
      setRegisterFormError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button className="button m-3" onClick={handleShow}>
        Create new post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitNewPost)}>
            {createPost && <SuccessMessage>Post created</SuccessMessage>}
            {registerFormError && (
              <ErrorMessage>{registerFormError}</ErrorMessage>
            )}
            <fieldset disabled={submitting}>
              <Form.Label htmlFor="title">* Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                {...register("title")}
              ></Form.Control>
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}

              <Form.Label htmlFor="body">* Content</Form.Label>
              <Form.Control
                type="text"
                id="body"
                {...register("body")}
              ></Form.Control>
              {errors.body && (
                <ErrorMessage>{errors.body.message}</ErrorMessage>
              )}

              <Form.Label htmlFor="tags">Tags</Form.Label>
              <Form.Control
                type="text"
                id="tags"
                {...register("tags")}
              ></Form.Control>
              {errors.tags && (
                <ErrorMessage>{errors.tags.message}</ErrorMessage>
              )}

              <Form.Label htmlFor="media">Image url</Form.Label>
              <Form.Control id="media" {...register("image")}></Form.Control>
              {errors.image && (
                <ErrorMessage>{errors.media.message}</ErrorMessage>
              )}
            </fieldset>
            <button
              className="button createPostForm__submit mt-3 "
              type="submit"
            >
              {submitting ? "Creating" : "Create"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
