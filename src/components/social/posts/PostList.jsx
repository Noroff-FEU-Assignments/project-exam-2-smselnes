import { social_url } from "../../../utils/Api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import PostItems from "./PostItems";
import Loader from "../../../utils/Loader";

const postsUrl =
  social_url + "posts?_author=true&_comments=true&_reactions=true";

export default function ListOfPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

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

  if (loading) {
    return <Loader />;
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
    </>
  );
}
