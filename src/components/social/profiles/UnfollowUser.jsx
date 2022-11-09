import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function UnFollowUser() {
  let { name } = useParams();
  const http = useAxios();

  async function submitUserUnFollow() {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return <button onClick={submitUserUnFollow}>Unfollow user</button>;
}
