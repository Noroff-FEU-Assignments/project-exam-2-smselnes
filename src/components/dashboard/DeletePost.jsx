import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { Alert } from "react-bootstrap";

export default function DeletePost({ id }) {
  const http = useAxios();
  const [show, setShow] = useState(false);

  async function deleteOwnPost() {
    try {
      const response = await http.delete(`posts/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <>
      <Alert variant="error" show={show}>
        <Alert.Heading>Confirm delete post?</Alert.Heading>
      </Alert>
      <button
        className="btn btn-danger"
        onClick={() => {
          deleteOwnPost();
          setShow(true);
        }}
      >
        Delete
      </button>
    </>
  );
}
