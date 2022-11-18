import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner, Tabs, Tab, Col } from "react-bootstrap";
import FollowUser from "./FollowUser";
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
        console.log(response.data.posts);
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getUsersProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="text-center">
        <img
          src={userProfile.banner}
          className="profile__banner mt-3"
          alt="the user's profile banner"
        />
        <h3 className="m-3">{userProfile.name}</h3>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3 justify-content-center"
        >
          <Tab eventKey="profile" title="Profile" className="text-center">
            <img
              src={userProfile.avatar}
              className="profile__avatar"
              alt="profile avatar"
            />
            <p>{userProfile.email}</p>
          </Tab>
          <Tab eventKey="stats" title="Stats" className="text-center">
            <p>{userProfile._count.posts} Posts</p>
            <p> {userProfile._count.followers} Followers</p>
            <p> {userProfile._count.following} Following</p>
          </Tab>
          <Tab eventKey="posts" title="Posts" className="">
            {userProfile.posts.map((userPosts, index) => {
              return (
                <div key={index} className="m-3 profileDetails__posts">
                  {/* <img src={userPosts.media} /> */}
                  <p>{userPosts.updated}</p>
                  <Link to={`/dashboard/posts/${userPosts.id}`}>
                    {userPosts.title}
                  </Link>
                </div>
              );
            })}
          </Tab>
        </Tabs>
        <FollowUser />
        <Col className="m-3">
          <a
            href="/dashboard/profiles"
            className="button profileDetails__navigateBack--btn"
          >
            back to profile list
          </a>
        </Col>
      </div>
    </>
  );
}
