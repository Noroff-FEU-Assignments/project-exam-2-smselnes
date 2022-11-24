import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import ErrorMessage from "../common/ErrorMessage";
import refreshAfterSubmit from "../common/RefreshAfterSubmit";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const schema = yup.object().shape({
  banner: yup.string().required("Required field."),
});

export default function UpdateProfileBanner() {
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

  async function changeBanner(data) {
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
        className="button changeBanner__button m-3 w-25"
      >
        Change banner
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(changeBanner)}
            className="changeBanner__form"
          >
            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            <fieldset disabled={submitting}>
              <Form.Label htmlFor="banner">New banner url</Form.Label>
              <Form.Control
                type="url"
                id="banner"
                {...register("banner")}
                defaultValue={auth.banner}
              />
              {errors.banner && (
                <ErrorMessage>{errors.banner.message}</ErrorMessage>
              )}
            </fieldset>
            <button type="submit" className="button m-3">
              {submitting ? "Updating" : "Update"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
