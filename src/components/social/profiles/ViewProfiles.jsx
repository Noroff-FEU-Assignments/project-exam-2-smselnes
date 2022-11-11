import { useState, useContext, useEffect } from "react";
import { social_url } from "../../../utils/Api";
import AuthContext from "../../../context/AuthContext";
import { Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const profileUrl = social_url + "profiles?sortOrder=desc&offset=50";

export default function ViewProfiles() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);

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
      <div key={index} className="profiles">
        <Card className="profiles__card m-3">
          {/*  <Card.Img src={profile.avatar} className="profiles__card--img" /> */}
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>Posts:{profile._count.posts}</Card.Text>
          <Link to={`/dashboard/profiles/${profile.name}`}>Details</Link>
        </Card>
      </div>
    );
  });
}
