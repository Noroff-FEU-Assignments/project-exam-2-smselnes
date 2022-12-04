import { SOCIAL_URL } from "../../../constants/Api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import PostItems from "./PostItems";
import Loader from "../../common/Loader";
import ErrorMessage from "../../common/ErrorMessage";
import { useNavigate } from "react-router-dom";

const postsUrl =
  SOCIAL_URL + "posts?_author=true&_comments=true&_reactions=true&limit=12";

export default function ListOfPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);
  const [postIndex, setPostIndex] = useState(12);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate(`/login`);
    }

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
        setPosts(json);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //test code below
  const loadMorePosts = () => {
    setPostIndex((count) => count + 12);
    async function getPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(
          postsUrl + `&offset=${postIndex}`,
          options
        );
        const newPostsData = await response.json();
        setPosts(posts.concat(newPostsData));
      } catch (error) {
        console.log(error);
        setError(error.toString());
      }
      setLoading(false);
    }
    getPosts();
  };
  // test code above

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage>
        <p>Error: There was an unexpected error.</p>
      </ErrorMessage>
    );
  }

  return (
    <>
      <div className="postList">
        {posts.map((post) => {
          const {
            id,
            title,
            body,
            media,
            created,
            updated,
            _count,
            comments,
            author,
            name,
            avatar,
          } = post;
          return (
            <PostItems
              key={id}
              id={id}
              title={title}
              body={body}
              media={media}
              created={created}
              updated={updated}
              _count={_count}
              comments={comments}
              author={author}
              name={name}
              avatar={avatar}
            />
          );
        })}
      </div>
      <button className="button mx-auto m-3 d-flex  " onClick={loadMorePosts}>
        More posts
      </button>
    </>
  );
}
