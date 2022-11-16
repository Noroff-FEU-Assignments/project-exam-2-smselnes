import { social_url } from "../../utils/Api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Spinner, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const carouselApi = social_url + "posts?limit=6&_author=true";

export default function Latestposts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    async function createGallery() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      try {
        const response = await fetch(carouselApi, options);
        const json = await response.json();
        console.log(json);
        setPosts(json);
      } catch (error) {
        setError(error.toString());
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    createGallery();
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
      </div>
    );
  }

  return posts.map((post, index) => {
    return (
      <div key={index} className="gallery__item">
        {/* <h3>{post.title}</h3> */}
        <h5>{post.author.name}</h5>
        <img src={post.media} />
        <Link to={`/dashboard/posts/${post.id}`}>Read</Link>
      </div>
    );
  });
}
