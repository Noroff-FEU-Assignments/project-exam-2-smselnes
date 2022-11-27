import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { Container } from "react-bootstrap";

export default function FollowUser() {
  let { name } = useParams();
  const http = useAxios();

  //test code below
  const [followed, setFollowed] = useState();
  console.log(followed);

  //test code above

  async function submitUserFollow() {
    try {
      const response = await http.put(`profiles/${name}/follow`);
      console.log(response);
      window.location.reload();
      setFollowed(true);
    } catch (error) {
      console.log(error.toString());
    }
  }
  //test code below
  async function submitUserUnFollow() {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      console.log(response);
      window.location.reload();
      setFollowed(false);
    } catch (error) {
      console.log(error.toString());
    }
  }

  //test code above

  return (
    <>
      <Container className="d-flex justify-content-center ">
        <button
          /* disabled={followed} */
          className="button follow__button m-3"
          onClick={submitUserFollow}
        >
          Follow
        </button>

        <button
          /* disabled={!followed} */
          className="unfollow__button button  m-3"
          onClick={submitUserUnFollow}
        >
          Unfollow
        </button>
      </Container>
    </>
  );
}
