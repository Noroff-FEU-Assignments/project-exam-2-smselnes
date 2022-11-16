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
      </div>
    );
  }

  return (
    <>
      <div className="postDetails">
        <h1 className="postDetails__title">{postDetails.title}</h1>
        <span>
          Author:
          <a href={`/dashboard/profiles/${postDetails.author.name}`}>
            {postDetails.author.name}
          </a>
        </span>
        <img
          className="postDetails__image"
          src={postDetails.media}
          width="200px"
        />
        <p className="postDetails__bodytext">Description: {postDetails.body}</p>

        <hr />
        <div>
          <CommentOnPost />
        </div>
        <div>
          <ReactOnPost />
        </div>
        <p>Number of comments: {postDetails._count.comments}</p>
        <div className="postComments mt-3">
          {postDetails.comments.map((comment, index) => {
            return (
              <div key={index} className="postComments__item">
                <p>By:{comment.owner}</p> <p>{comment.body}</p>
              </div>
            );
          })}
        </div>

        <div className="postReactions">
          <p>Reactions:</p>
          {postDetails.reactions.map((reaction, index) => {
            return (
              <div key={index} className="postReactions__item">
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
