import { social_url } from "../../../utils/Api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const postsUrl =
  social_url + "posts?_author=true&_comments=true&_reactions=true";

export default function ListOfPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    async function getPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(postsUrl, options);
        const json = await response.json();
        console.log(json);
        console.log(response);
        setPosts(json);
        console.log(posts);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
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

  const defaultPostImage =
    "https://via.placeholder.com/150/eff0ea/494031/?text=no image";

  return (
    <div className="postList">
      {posts.map((post) => {
        const formattedDate = post.updated.slice(2, -14);
        return (
          <Card key={post.id} className="postList__card m-3">
            <Card.Img
              variant="top"
              className="postList__card--image"
              src={post.media ? post.media : defaultPostImage}
            />
            <Card.Body>
              <Card.Title className="postList__card--header">
                {post.title}
              </Card.Title>
              <Card.Link
                href={`/dashboard/profiles/${post.author.name}`}
                className="postList__card--author text-decoration-underline"
              >
                {post.author.name}
              </Card.Link>
              <Card.Text>Updated: {formattedDate}</Card.Text>
              <Card.Text>{post._count.comments} Comments</Card.Text>
              <Card.Text>{post._count.reactions} Reactions </Card.Text>
              <a href={`/dashboard/posts/${post.id}`}>
                <BsFillArrowRightCircleFill className="postList__card--arrow" />
              </a>
              {/* <Link
                to={`/dashboard/posts/${post.id}`}
                className="button postList__card--btn"
              >
                Go to
              </Link> */}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
