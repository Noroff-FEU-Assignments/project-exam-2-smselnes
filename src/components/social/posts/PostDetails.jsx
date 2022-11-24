import { useParams } from "react-router-dom";
import { social_url } from "../../../utils/Api";
import AuthContext from "../../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import CommentOnPost from "./CommentOnPost";
import ReactOnPost from "./ReactOnPost";

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth /* setAuth */] = useContext(AuthContext);
  document.title = "Medi@holic | Post Details";

  let { id } = useParams();
  const postDetailUrl =
    social_url + `posts/${id}?_author=true&_comments=true&_reactions=true`;

  useEffect(() => {
    async function getPostsDetails() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      try {
        const response = await fetch(postDetailUrl, options);
        const json = await response.json();
        console.log(json);
        setPostDetails(json);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPostsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDetailUrl]);

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
      <div className="postDetails mb-3">
        <h1 className="postDetails__title mt-3">{postDetails.title}</h1>
        <p>
          Posted by:
          <a href={`/dashboard/profiles/${postDetails.author.name}`}>
            {postDetails.author.name}
          </a>
        </p>
        <img
          className="postDetails__image"
          src={postDetails.media}
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
          <p>Comments: {postDetails._count.comments}</p>
          <CommentOnPost />
        </div>
        <div>
          <p>Reactions: {postDetails._count.reactions}</p>
          <ReactOnPost />
        </div>
        <a href={`/dashboard/${auth.name}`} className="button mb-3">
          back to profile
        </a>
      </div>
    </>
  );
}
