import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { SOCIAL_URL } from "../../../constants/Api";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import SuccessMessage from "../../common/SuccessMessage";

export default function FollowUser() {
  const [followError, setFollowError] = useState(null);
  const [followMessage, setfollowMessage] = useState(null);

  const { name } = useParams();
  const http = useAxios();
  const url = SOCIAL_URL + `profiles/${name}/follow`;

  async function follow() {
    try {
      const response = await http.put(url);
      console.log(response);
      setfollowMessage(true);
      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error) {
      console.log(error.response);
      setFollowError(error.response);
    }
  }

  return (
    <div>
      <button onClick={follow} className="button follow__button">
        Follow
      </button>
      {followMessage && (
        <SuccessMessage>
          <p>You are now following {name} </p>
        </SuccessMessage>
      )}
      {followError && (
        <ErrorMessage>
          <p>Something went wrong when updating...</p>{" "}
          <p>Please try again later.</p>
        </ErrorMessage>
      )}
    </div>
  );
}
