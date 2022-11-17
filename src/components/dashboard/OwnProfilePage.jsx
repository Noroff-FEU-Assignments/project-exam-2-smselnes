import useAxios from "../../hooks/useAxios";
import { useState, useEffect /* useContext */ } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import UpdateProfileBanner from "./UpdateProfileBanner";
import UpdateProfileAvatar from "./UpdateProfileAvatar";
import UpdateFormModal from "../../utils/UpdatePostModal";
import DeletePost from "./DeletePost";
//import AuthContext from "../../context/AuthContext";
import CreateNewPost from "../../utils/CreateNewPostModal";
import LogoutButton from "../common/LogoutButton";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import moment from "moment/moment";

export default function OwnProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownProfile, setOwnProfile] = useState([]);
  /* const [auth, setAuth] = useContext(AuthContext); */

  let { name } = useParams();
  const http = useAxios();

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
      <div className="d-grid text-center">
        <p>{ownProfile.name}</p>
        <img src={ownProfile.banner} width="100%" />
      </div>
      <div className="d-flex justify-content-center">
        <UpdateProfileBanner />
        <UpdateProfileAvatar />
        <LogoutButton />
      </div>

      <div className="d-grid justify-content-center">
        <img src={ownProfile.avatar} width="150" />
      </div>

      <div className="d-flex justify-content-evenly bg-warning">
        <p>Followers: {ownProfile._count.followers}</p>
        <p>Following: {ownProfile._count.following}</p>
      </div>

      <div className="ownPostsContainer text-center mb-3">
        <h1>My posts</h1>
        <CreateNewPost />
        {ownProfile.posts.map((ownPost, index) => {
          return (
            <div key={index} className="ownPost">
              <h3>{ownPost.title}</h3>
              <p>Last edit:{ownPost.updated}</p>
              <a href={`/dashboard/posts/${ownPost.id}`}>
                <BsFillArrowRightCircleFill className="ownPost__arrow" />
              </a>

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
