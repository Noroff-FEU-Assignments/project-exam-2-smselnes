import { useParams } from "react-router-dom";
import { social_url } from "../../utils/Api";
import AuthContext from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { Spinner, Button } from "react-bootstrap";

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
        <h1>Title: {postDetails.title}</h1>
        <p>By:{postDetails.author.name}</p>
        <p>Description: {postDetails.body}</p>
        <p>Number of comments: {postDetails._count.comments}</p>
        <div className="postComments">
          {postDetails.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p>By:{comment.owner}</p> <p>{comment.body}</p>{" "}
              </div>
            );
          })}
        </div>
      </div>
      <Button href="/dashboard/posts">back to posts</Button>
    </>
  );
}
