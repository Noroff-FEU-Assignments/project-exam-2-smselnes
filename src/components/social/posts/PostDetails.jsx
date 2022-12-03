import { useParams, useNavigate } from "react-router-dom";
import { SOCIAL_URL } from "../../../constants/Api";
import AuthContext from "../../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import CommentOnPost from "./CommentOnPost";
import ReactOnPost from "./ReactOnPost";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import Loader from "../../common/Loader";
import { defaultAvatarImage } from "../../common/DefaultImageUrl";
import moment from "moment";

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth /* setAuth */] = useContext(AuthContext);
  const navigate = useNavigate();
  document.title = "Medi@holic | Post Details";

  let { id } = useParams();

  const http = useAxios();
  const url =
    SOCIAL_URL + `posts/${id}?_author=true&_comments=true&_reactions=true`;

  useEffect(() => {
    async function getPostsDetails() {
      if (!id) {
        navigate("/dashboard/posts");
      }
      try {
        const response = await http.get(url);
        if (response.status === 200) {
          setPostDetails(response.data);
        }
        console.log(response);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPostsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage>
        <p className="">
          Something went wrong. Please reload the page or try again later.
        </p>
        <a href="/dashboard/posts" className="button">
          Go back to posts.
        </a>
      </ErrorMessage>
    );
  }

  return (
    <>
      <div className="postDetails mb-3">
        <h1 className="postDetails__title mt-3">{postDetails.title}</h1>
        <p>
          Posted by:
          <a href={`/dashboard/profiles/${postDetails.author.name}`}>
            {postDetails.author.name}
          </a>
        </p>
        <p> {moment(postDetails.updated).format("DD MMM YY, h:mm:ss a")}</p>
        <img
          className="postDetails__image"
          src={postDetails.media ? postDetails.media : defaultAvatarImage}
          alt="the media selected for the specified post"
        />
        <p className="postDetails__bodytext">Content: {postDetails.body}</p>
        <div className="postDetails__tags">
          Tags:
          {postDetails.tags.map((tag, index) => {
            return (
              <p key={index} className="postDetails__tags--item mx-1">
                {tag}
              </p>
            );
          })}
        </div>

        <div>
          <p className="postDetails__comments">
            Comments: {postDetails._count.comments}
          </p>
          <CommentOnPost />
        </div>
        <div>
          <p className="postDetails__reactions">
            Reactions: {postDetails._count.reactions}
          </p>
          <ReactOnPost />
        </div>
        <a href="/dashboard/posts" className="button m-3">
          all posts
        </a>
        <a href={`/dashboard/${auth.name}`} className="button m-3">
          my profile
        </a>
      </div>
    </>
  );
}
