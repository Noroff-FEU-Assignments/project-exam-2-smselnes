//this example is used to fetch other social data... JUST AN EXAMPLE FUNCTION
//this example is used to fetch other social data... JUST AN EXAMPLE FUNCTION
import { social_url } from "../../utils/Api";
import { base_url } from "../../utils/Api";
import { userToken } from "../../utils/Api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const postsUrl = social_url + "posts";

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
          //Authorization: `${userToken}`,
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

  return posts.map((post) => {
    const formattedDate = post.updated.slice(2, -14);
    return (
      <Card key={post.id} className="m-3">
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>Updated: {formattedDate}</Card.Text>
        <Link to={`/dashboard/posts/${post.id}`}>View Post</Link>
      </Card>
    );
  });
}
