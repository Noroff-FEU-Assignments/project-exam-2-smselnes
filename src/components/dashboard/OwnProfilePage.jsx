import useAxios from "../../hooks/useAxios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Button, Modal } from "react-bootstrap";
import UpdateProfileBanner from "./UpdateProfileBanner";
import UpdateProfileAvatar from "./UpdateProfileAvatar";
import UpdateFormModal from "../../utils/UpdatePostModal";
import DeletePost from "./DeletePost";
import AuthContext from "../../context/AuthContext";
import CreateNewPost from "../../utils/CreateNewPostModal";

export default function OwnProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownProfile, setOwnProfile] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);

  let { name } = useParams();
  const navigate = useNavigate();
  const http = useAxios();

  function logoutUser() {
    setAuth(null);
    navigate("/login");
  }

  useEffect(() => {
    async function getOwnUserProfile() {
      try {
        const response = await http.get(
          `profiles/${name}?_posts=true&_following=true&_followers=true`
        );
        setOwnProfile(response.data);
        console.log(response.data.posts);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getOwnUserProfile();
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
        <p>Advanced: {error}</p>
      </div>
    );
  }
  return (
    <>
      <img src={ownProfile.banner} width="100%" />
      <img src={ownProfile.avatar} width="150" />
      <Button onClick={logoutUser}>Log out</Button>
      <h1>{ownProfile.name}</h1>
      <p>Followers: {ownProfile._count.followers}</p>
      <p>Following: {ownProfile._count.following}</p>
      <CreateNewPost />
      <UpdateProfileBanner />
      <UpdateProfileAvatar />
      <div className="ownPostsContainer">
        <h1>My posts</h1>
        {ownProfile.posts.map((ownPost, index) => {
          return (
            <div key={index} className="ownPost">
              <h3>{ownPost.title}</h3>
              <p>Last edit: {ownPost.updated}</p>
              <UpdateFormModal
                id={ownPost.id}
                title={ownPost.title}
                body={ownPost.body}
              />
              <DeletePost id={ownPost.id} />
            </div>
          );
        })}
      </div>
    </>
  );
}
