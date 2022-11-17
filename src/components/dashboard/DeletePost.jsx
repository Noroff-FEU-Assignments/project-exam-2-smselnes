import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";

export default function DeletePost({ id }) {
  const http = useAxios();
  const [show, setShow] = useState(false);

  async function deleteOwnPost() {
    try {
      const response = await http.delete(`posts/${id}`);
      console.log(response);

      window.location.reload(true);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <>
      <Alert className="ownPost__delete__alert" show={show}>
        <Alert.Heading>Confirm delete post?</Alert.Heading>
        <Button onClick={deleteOwnPost}>Yes</Button>
        <Button
          onClick={() => {
            setShow(false);
          }}
        >
          No
        </Button>
      </Alert>
      <button
        className="btn btn-danger "
        onClick={() => {
          setShow(true);
        }}
      >
        Delete
      </button>
    </>
  );
}
