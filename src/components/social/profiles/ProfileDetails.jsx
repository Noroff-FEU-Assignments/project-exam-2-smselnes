import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner, Tabs, Tab, Col } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import moment from "moment";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import FollowOrUnfollow from "./FollowOrUnfollow";
import Loader from "../../../utils/Loader";

export default function ProfileDetails() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [auth] = useContext(AuthContext);

  let { name } = useParams();
  const navigate = useNavigate();
  document.title = `Medi@holic | ${name} `;

  if (!name) {
    navigate("/dashboard");
  }

  const http = useAxios();

  useEffect(() => {
    async function getUsersProfile() {
      try {
        const response = await http.get(
          `profiles/${name}?_followers=true&_following=true&_posts=true`
        );
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

  const followingUrl = `profiles/${auth.name}?_following=true`;

  useEffect(() => {
    async function checkIfFollowing() {
      try {
        const response = await http.get(followingUrl);
        setFollowed(response.data.following);
      } catch (error) {
        setError(error.toString);
      }
    }
    checkIfFollowing();
  }, [followingUrl]);

  if (loading) {
    return <Loader />;
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
        <FollowOrUnfollow followed={followed} user={userProfile.name} />
        <Col className="m-3">
          <a
            href="/dashboard/profiles"
            className="button profileDetails__navigateBack--btn"
          >
            back to profile list
          </a>
        </Col>
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
          <Tab
            eventKey="posts"
            title="Posts"
            className="text-center d-inline-block"
          >
            {userProfile.posts.map((userPosts, index) => {
              return (
                <div key={index} className="m-3 profileDetails__posts">
                  <p>
                    {moment(userPosts.updated).format("DD MMM YY, hh:mm a")}
                  </p>
                  <Link to={`/dashboard/posts/${userPosts.id}`}>
                    {userPosts.title}
                  </Link>
                </div>
              );
            })}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
