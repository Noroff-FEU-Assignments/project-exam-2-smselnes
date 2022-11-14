import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { Container, Col, Row } from "react-bootstrap";

export default function FollowUser() {
  let { name } = useParams();
  const http = useAxios();

  //test code below
  const [followed, setFollowed] = useState(null);
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
      {" "}
      <Container>
        <Row>
          <Col>
            <button
              /* disabled={followed} */
              className="btn btn-primary"
              onClick={submitUserFollow}
            >
              Follow
            </button>
          </Col>
          <Col>
            <button
              /* disabled={!followed} */
              className="btn btn-danger"
              onClick={submitUserUnFollow}
            >
              Unfollow
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
