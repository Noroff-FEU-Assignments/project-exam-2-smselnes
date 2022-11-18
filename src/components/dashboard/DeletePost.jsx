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

      window.location.reload(true);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <>
      <Alert className="ownPost__delete--alert" show={show}>
        <Alert.Heading>Confirm delete post?</Alert.Heading>
        <button
          onClick={deleteOwnPost}
          className="button ownPost__delete--confirm m-3"
        >
          Yes
        </button>
        <button
          onClick={() => {
            setShow(false);
          }}
          className="button ownPost__delete--cancel m-3"
        >
          No
        </button>
      </Alert>
      <button
        className="button m-3"
        onClick={() => {
          setShow(true);
        }}
      >
        Delete
      </button>
    </>
  );
}
