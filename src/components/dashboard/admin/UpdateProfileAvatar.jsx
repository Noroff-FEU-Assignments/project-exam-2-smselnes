import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import ErrorMessage from "../../common/ErrorMessage";
import refreshAfterSubmit from "../../common/RefreshAfterSubmit";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const schema = yup.object().shape({
  avatar: yup.string().required("Required field"),
});

export default function UpdateProfileAvatar() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [show, setShow] = useState(false);
  const [auth] = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { name } = useParams();

  async function changeAvatar(data) {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await http.put(`profiles/${name}/media`, data);
      console.log(response);
      refreshAfterSubmit();
    } catch (error) {
      console.log(error);
      setSubmitError(error.toString());
    }
  }

  return (
    <>
      <button
        onClick={handleShow}
        className="button changeAvatar__button m-3 w-25"
      >
        Change avatar
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(changeAvatar)}
            className="changeAvatar__form"
          >
            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            <fieldset disabled={submitting}>
              <Form.Label htmlFor="avatar">New avatar url</Form.Label>
              <Form.Control
                type="url"
                id="avatar"
                {...register("avatar")}
                defaultValue={auth.avatar}
              />
              {errors.avatar && (
                <ErrorMessage>{errors.avatar.message}</ErrorMessage>
              )}
            </fieldset>
            <button type="submit" className="button m-3 changeAvatar__submit">
              {submitting ? "Updating" : "Update"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
