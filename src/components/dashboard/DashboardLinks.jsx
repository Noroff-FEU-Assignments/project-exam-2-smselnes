import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import postsImage from "../../assets/posts-background.jpg";
import profilesImage from "../../assets/profiles-background.jpg";
import settingsImage from "../../assets/profile-background.jpg";
import { Link } from "react-router-dom";

export default function DashboardLinks() {
  const [auth] = useContext(AuthContext);
  return (
    <div className="dashboardNavigation mt-3">
      <div className="dashboardNavigation__posts mb-3">
        <Link to="/dashboard/posts" className="dashboardNavigation--link">
          View posts
        </Link>
        <img
          src={postsImage}
          className="dashboardNavigation--image"
          alt="several creative people gathered around a workboard filled with creative ideas."
        />
      </div>
      <div className="dashboardNavigation__profiles mb-3">
        <Link to="/dashboard/profiles" className="dashboardNavigation--link">
          View community
        </Link>
        <img
          src={profilesImage}
          className="dashboardNavigation--image"
          alt="a dressed up man holding a keyboard and having big eyes through his glasses."
        />
      </div>
      <div className="dashboardNavigation__profile mb-3">
        <Link
          to={`/dashboard/${auth.name}`}
          className="dashboardNavigation--link"
        >
          My Profile
        </Link>
        <img
          src={settingsImage}
          className="dashboardNavigation--image"
          alt="cogwheels put on top of keyboard."
        />
      </div>
    </div>
  );
}
