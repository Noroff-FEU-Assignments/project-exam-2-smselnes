import { useState, useContext, useEffect } from "react";
import { social_url } from "../../../utils/Api";
import AuthContext from "../../../context/AuthContext";
import ErrorMessage from "../../common/ErrorMessage";
import Loader from "../../../utils/Loader";
import ProfileItem from "./ProfileItem";

const profileUrl =
  social_url +
  "profiles?sortOrder=asc&_followers=true&_following=true&_posts=true&limit=18";

export default function ViewProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [auth /* setAuth */] = useContext(AuthContext);
  const [profileIndex, setProfileIndex] = useState(18);

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

  //test code below
  const loadMoreProfiles = () => {
    setProfileIndex((count) => count + 18);
    async function getProfiles() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(
          profileUrl + `&offset=${profileIndex}`,
          options
        );
        const newProfilesData = await response.json();
        setProfiles(profiles.concat(newProfilesData));
      } catch (error) {
        console.log(error);
        setError(error.toString());
      }
      setLoading(false);
    }
    getProfiles();
  };
  // test code above

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
          const { name, avatar, posts, _count, followers, following } = profile;
          return (
            <ProfileItem
              key={name}
              name={name}
              avatar={avatar}
              count={_count}
              posts={posts}
              followers={followers}
              following={following}
            />
          );
        })}
      </div>
      <button
        className="button mx-auto m-3 d-flex  "
        onClick={loadMoreProfiles}
      >
        More profiles
      </button>
    </>
  );
}
