//this example is used to fetch other social data... JUST AN EXAMPLE FUNCTION
import { useState } from "react";
import { base_url } from "../../utils/Api";
import { userToken } from "../../utils/Api";
import { Spinner } from "react-bootstrap";

const url = base_url + "api/v1/social/profiles";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  async function getPosts() {
    const options = {
      headers: {
        Authorization: `${userToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setLoading(true);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  getPosts();

  return <div>LoginForm</div>;
}
