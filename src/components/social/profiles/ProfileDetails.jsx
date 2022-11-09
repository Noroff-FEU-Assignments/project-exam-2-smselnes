import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import FollowUser from "./FollowUser";
import UnFollowUser from "./UnfollowUser";

export default function ProfileDetails() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([]);

  let { name } = useParams();
  const http = useAxios();

  useEffect(() => {
    async function getUsersProfile() {
      try {
        const response = await http.get(
          `profiles/${name}?_posts&_followers&_following`
        );
        console.log(response.data);
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUsersProfile();
  }, []);

  if (loading) {
    return (
      <Spinner className="text-center" role="status" size="lg">
        <span className="loadingText">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <div className="errorMessage">
        <p>Error: There was an unexpected error.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <img src={userProfile.banner} className="profile__banner" />
        <h3>Name: {userProfile.name}</h3>
        <img src={userProfile.avatar} className="profile__avatar" />
        <p>Email: {userProfile.email}</p>
        <p>Followers: {userProfile._count.followers}</p>
        <p>Following: {userProfile._count.following}</p>
      </div>
      <FollowUser />
      <UnFollowUser />
      <Button href="/dashboard/profiles">back to profile list</Button>
    </>
  );
}
