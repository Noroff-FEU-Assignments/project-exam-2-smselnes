import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Heading from "../layout/Heading";

export default function HomepageIntroduction() {
  const [auth] = useContext(AuthContext);
  return (
    <div className="home__introduction">
      <Heading heading="Share, Interact, Socialize, Inspire!" />
      <p>
        Medi@holic is a trending social media platform where you post, interact
        and share with likeminded!
      </p>
      <div className="home__introduction--inner mt-3 p-3">
        {auth ? (
          <>
            <h5>Welcome back</h5>
            <h5>{auth.name}!</h5>
            <a href="/dashboard" className="button">
              My pages
            </a>
          </>
        ) : (
          <a href="/login" className="button">
            Login
          </a>
        )}

        <a href="/register" className="button m-3">
          New user? <br /> Register here
        </a>
      </div>
    </div>
  );
}
