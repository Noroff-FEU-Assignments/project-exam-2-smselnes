import { useContext } from "react";
import { useParams, Link } from "react-router-dom";

import postsImage from "../../assets/posts-background.jpg";
import profilesImage from "../../assets/profiles-background.jpg";
import settingsImage from "../../assets/profile-background.jpg";
import AuthContext from "../../context/AuthContext";
import Heading from "../layout/Heading";
import SubHeading from "../layout/SubHeading";

export default function DashboardPage() {
  let { name } = useParams();
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <div className="dashboard__welcome text-center mt-3">
        <Heading heading="Good day" />
        <SubHeading subHeading={auth.name} />
        <SubHeading subHeading="What mood are you in today?" />
      </div>

      <div className="dashboardNavigation mt-3">
        <div className="dashboardNavigation__posts mb-3">
          <Link to="/dashboard/posts" className="dashboardNavigation--link">
            View posts
          </Link>
          <img src={postsImage} className="dashboardNavigation--image" />
        </div>
        <div className="dashboardNavigation__profiles mb-3">
          <Link to="/dashboard/profiles" className="dashboardNavigation--link">
            View community
          </Link>
          <img src={profilesImage} className="dashboardNavigation--image" />
        </div>
        <div className="dashboardNavigation__profile mb-3">
          <Link
            to={`/dashboard/${auth.name}`}
            className="dashboardNavigation--link"
          >
            My Profile
          </Link>
          <img src={settingsImage} className="dashboardNavigation--image" />
        </div>
      </div>
      {/* <div className="gallery">
        <Latestposts />
      </div> */}
    </>
  );
}
