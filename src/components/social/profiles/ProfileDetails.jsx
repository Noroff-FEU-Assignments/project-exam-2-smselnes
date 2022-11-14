import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner, Button, Tabs, Tab } from "react-bootstrap";
import FollowUser from "./FollowUser";
import UnFollowUser from "./UnfollowUser";
import useAxios from "../../../hooks/useAxios";

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
          `profiles/${name}?_followers=true&_following=true&_posts=true`
        );
        console.log(response.data);
        console.log(response.data._count.posts);
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
      <img src={userProfile.banner} className="profile__banner" />
      <h3>{userProfile.name}</h3>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
          <img src={userProfile.avatar} className="profile__avatar" />
          <p>Email: {userProfile.email}</p>
        </Tab>
        <Tab eventKey="stats" title="Stats">
          <p>Posts: {userProfile._count.posts}</p>
          <p>Followers: {userProfile._count.followers}</p>
          <p>Following: {userProfile._count.following}</p>
        </Tab>
      </Tabs>

      <FollowUser />
      {/* <UnFollowUser /> */}
      <Button href="/dashboard/profiles" className="m-3">
        back to profile list
      </Button>
    </>
  );
}
