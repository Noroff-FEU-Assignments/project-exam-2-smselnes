import { useParams } from "react-router-dom";
import { social_url } from "../../../utils/Api";
import AuthContext from "../../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { Spinner, Button } from "react-bootstrap";
import CommentOnPost from "./CommentOnPost";
import ReactOnPost from "./ReactOnPost";

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

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
        <p>Advanced: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>{postDetails.title}</h1>
        <span>
          Author:
          <a href={`/dashboard/profiles/${postDetails.author.name}`}>
            {postDetails.author.name}
          </a>
        </span>
        <img src={postDetails.media} width="200px" />
        <p>Description: {postDetails.body}</p>

        <hr />
        <p>Number of comments: {postDetails._count.comments}</p>
        <div>
          <ReactOnPost />
        </div>
        <div>
          <CommentOnPost />
        </div>
        <div className="postComments">
          {postDetails.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p>By:{comment.owner}</p> <p>{comment.body}</p>{" "}
              </div>
            );
          })}
        </div>

        <p>Reactions:</p>
        <div className="postReactions">
          {postDetails.reactions.map((reaction) => {
            return (
              <div>
                <span>{reaction.symbol}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Button href="/dashboard/posts">back to posts</Button>
    </>
  );
}
