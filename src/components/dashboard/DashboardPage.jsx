import useAxios from "../../hooks/useAxios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Button, Modal } from "react-bootstrap";
import UpdateProfileBanner from "./UpdateProfileBanner";
import UpdateProfileAvatar from "./UpdateProfileAvatar";
import UpdateFormModal from "../../utils/UpdatePostModal";
import DeletePost from "./DeletePost";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownProfile, setOwnProfile] = useState([]);

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
      <img src={ownProfile.banner} width="150" />
      <img src={ownProfile.avatar} width="150" />
      <h1>{ownProfile.name}</h1>
      <p>Followers: {ownProfile._count.followers}</p>
      <p>Following: {ownProfile._count.following}</p>
      <ul className="dashboard__menu">
        <li className="dashboard__menu--link">
          <a href="/dashboard/posts">View posts</a>
        </li>
        <li className="dashboard__menu--link">
          {" "}
          <a href="/dashboard/profiles">View profiles</a>
        </li>
        <li className="dashboard__menu--link">
          <a href="/dashboard/createpost">Create post</a>
        </li>
      </ul>
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
              {/* <Button className="m-3 bg-danger">Delete</Button> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
