import { useState, useContext, useEffect } from "react";
import { social_url } from "../../../utils/Api";
import AuthContext from "../../../context/AuthContext";
import { Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const defaultAvatarImage =
  "https://via.placeholder.com/150/494031/f2f2f2/?text=no image";

const profileUrl = social_url + "profiles?sortOrder=asc&offset=300&limit=100";

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

  return profiles.map((profile, index) => {
    return (
      <>
        <div className="profiles">
          <Card key={index} className="profiles__card m-3">
            {/* <Card.Img
              src={profile.banner ? profile.banner : defaultBannerImage}
              className="profiles__card--banner"
            /> */}

            <Card.Img
              src={profile.avatar ? profile.avatar : defaultAvatarImage}
              className="profiles__card--avatar"
            />
            <Card.Title>{profile.name}</Card.Title>

            <Card.Text>Posts:{profile._count.posts}</Card.Text>

            <Link
              to={`/dashboard/profiles/${profile.name}`}
              className="profiles__card--link"
            >
              Visit profile
            </Link>
          </Card>
        </div>
      </>
    );
  });
}
