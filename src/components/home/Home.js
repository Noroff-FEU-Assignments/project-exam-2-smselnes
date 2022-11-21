import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../layout/Heading";
import { PageTitle } from "../common/PageTitle";

export default function Home() {
  const [auth, setAuth] = useContext(AuthContext);
  PageTitle("Medi@holic | Home");
  return (
    <>
      <div className="home__introduction">
        <Heading heading="Share, Interact, Socialize, Inspire!" />
        <p>
          Medi@holic is a trending social media platform where you post,
          interact and share with likeminded!
        </p>
        <div className="home__introduction--inner mt-3 p-3">
          {auth ? (
            <>
              <h5>Welcome back {auth.name}!</h5>
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

        {/* <img
            src={banner}
            alt="big smiley with hearty eyes looking to left"
            className="home__introduction--image mb-3"
          /> */}
      </div>
    </>
  );
}
