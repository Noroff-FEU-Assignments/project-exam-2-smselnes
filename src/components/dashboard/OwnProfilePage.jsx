import useAxios from "../../hooks/useAxios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Dropdown } from "react-bootstrap";
import UpdateProfileBanner from "./UpdateProfileBanner";
import UpdateProfileAvatar from "./UpdateProfileAvatar";
import UpdateFormModal from "../../utils/UpdatePostModal";
import DeletePost from "./DeletePost";
import AuthContext from "../../context/AuthContext";
import CreateNewPost from "../../utils/CreateNewPostModal";
import LogoutButton from "../common/LogoutButton";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import moment from "moment/moment";

export default function OwnProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownProfile, setOwnProfile] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  document.title = "Medi@holic | My profile";
  const [auth, setAuth] = useContext(AuthContext);

  let { name } = useParams();
  const http = useAxios();

  useEffect(() => {
    async function getOwnUserProfile() {
      try {
        const response = await http.get(
          `profiles/${name}?_posts=true&_following=true&_followers=true`
        );
        const ownProfileData = response.data;
        setOwnProfile(ownProfileData);
        setFollowers(ownProfileData.followers);
        setFollowing(ownProfileData.following);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getOwnUserProfile();
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
      <div className="ownProfile text-center">
        <img
          className="ownProfile__banner"
          src={ownProfile.banner}
          width="100%"
          alt={`${ownProfile.name}'s profile banner`}
        />
        <div>
          <h2 className="ownProfile__title">{ownProfile.name}</h2>
          <LogoutButton />
        </div>

        <img
          className="ownProfile__avatar"
          src={ownProfile.avatar}
          width="100px"
          alt={`${ownProfile.name}'s profile avatar`}
        />
      </div>
      <div className="ownProfile__buttons d-flex justify-content-center">
        <UpdateProfileBanner />
        <UpdateProfileAvatar />
      </div>

      <div className="ownProfile__follow">
        <Dropdown className="m-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {followers.length} Followers
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {followers.map((followers) => {
              return (
                <Dropdown.Item
                  key={followers.name}
                  href={`/dashboard/profiles/${followers.name}`}
                >
                  {followers.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="m-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {following.length} Following
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {following.map((following) => {
              return (
                <Dropdown.Item
                  key={following.name}
                  href={`/dashboard/profiles/${following.name}`}
                >
                  {following.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="ownPostsContainer text-center mb-3">
        <h1>My posts</h1>
        <CreateNewPost />
        {ownProfile.posts.map((ownPost, index) => {
          return (
            <div key={index} className="ownPost">
              <h3>{ownPost.title}</h3>
              <p>Last edit: {moment(ownPost.updated).format("DD MMM YY")}</p>

              <UpdateFormModal
                id={ownPost.id}
                title={ownPost.title}
                body={ownPost.body}
                tags={ownPost.tags}
                media={ownPost.media}
              />
              <DeletePost id={ownPost.id} />
              <a href={`/dashboard/posts/${ownPost.id}`}>
                <BsFillArrowRightCircleFill className="ownPost__arrow" />
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
