import { useState, useContext, useEffect } from "react";
import { social_url } from "../../../utils/Api";
import AuthContext from "../../../context/AuthContext";
import ErrorMessage from "../../common/ErrorMessage";
import Loader from "../../../utils/Loader";
import ProfileItem from "./ProfileItem";

const profileUrl =
  social_url +
  "profiles?sortOrder=asc&offset=100&_followers=true&_following=true&_posts=true";

export default function ViewProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [auth /* setAuth */] = useContext(AuthContext);

  useEffect(() => {
    async function getProfiles() {
      setLoading(true);
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      try {
        const response = await fetch(profileUrl, options);
        const json = await response.json();
        console.log(json);
        setProfiles(json);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage>
        <p>There was an unexpected error.</p>{" "}
        <p> Please reload the page or try again later.</p>
      </ErrorMessage>
    );
  }

  return (
    <>
      <div className="profiles">
        {profiles.map((profile) => {
          const { name, avatar, _count } = profile;
          return (
            <ProfileItem
              key={name}
              name={name}
              avatar={avatar}
              count={_count}
            />
          );
        })}
      </div>
    </>
  );
}
