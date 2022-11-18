import { useState, useContext, useEffect } from "react";
import { social_url } from "../../../utils/Api";
import AuthContext from "../../../context/AuthContext";
import { Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const defaultAvatarImage =
  "https://via.placeholder.com/150/eff0ea/494031/?text=no image";

const profileUrl = social_url + "profiles?sortOrder=asc&offset=150&limit=100";

export default function ViewProfiles() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [auth /* setAuth */] = useContext(AuthContext);

  useEffect(() => {
    async function getProfiles() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      try {
        const response = await fetch(profileUrl, options);
        const json = await response.json();
        console.log(json);
        setProfiles(json);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      <div className="profiles">
        {profiles.map((profile, index) => {
          return (
            <Card key={index} className="profiles__card m-3">
              <Card.Img
                src={profile.avatar ? profile.avatar : defaultAvatarImage}
                className="profiles__card--avatar"
              />
              <Card.Title className="mt-2">{profile.name}</Card.Title>
              <Card.Text>Posts:{profile._count.posts}</Card.Text>
              <Link
                to={`/dashboard/profiles/${profile.name}`}
                className="button profiles__card--link mt-auto mb-3"
              >
                Visit profile
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
}
