import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function FollowUser() {
  let { name } = useParams();
  const http = useAxios();

  async function submitUserFollow() {
    try {
      const response = await http.put(`profiles/${name}/follow`);
    } catch (error) {
      console.log(error);
    }
  }
  return <button onClick={submitUserFollow}>Follow user</button>;
}
