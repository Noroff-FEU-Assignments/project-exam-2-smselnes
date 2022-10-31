//this example is used to fetch other social data... JUST AN EXAMPLE FUNCTION
import { base_url } from "../../utils/Api";
import { userToken } from "../../utils/Api";

const url = base_url + "api/v1/social/posts";

export default function LoginForm() {
  async function getPosts() {
    const options = {
      headers: {
        Authorization: `${userToken}`,
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }

  getPosts();

  return (
    <>
      <h1>Posts list</h1>
    </>
  );
}
