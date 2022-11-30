import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { social_url } from "../../../utils/Api";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import SuccessMessage from "../../common/SuccessMessage";

export default function UnFollowUser() {
  const [unfollowError, setUnfollowError] = useState(null);
  const [unfollowMessage, setUnfollowMessage] = useState(null);

  const { name } = useParams();
  const http = useAxios();
  const url = social_url + `profiles/${name}/unfollow`;

  async function unfollow() {
    try {
      const response = await http.put(url);
      console.log(response);
      setUnfollowMessage(true);
      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error) {
      setUnfollowError(error.response);
    }
  }

  return (
    <div>
      <button onClick={unfollow} className="button follow__button">
        Unfollow
      </button>
      {unfollowMessage && (
        <SuccessMessage>
          <p>You are no longer following {name}</p>
        </SuccessMessage>
      )}
      {unfollowError && (
        <ErrorMessage>
          <p>Something went wrong when updating...</p>{" "}
          <p>Please try again later.</p>
        </ErrorMessage>
      )}
    </div>
  );
}
