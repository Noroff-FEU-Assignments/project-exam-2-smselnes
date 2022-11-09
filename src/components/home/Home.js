import React from "react";
import banner from "../../assets/banner_vertical.jpg";
import { Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <>
      <div className="home__introduction">
        <img
          src={banner}
          alt="big smiley with hearty eyes looking to left"
          className="home__introduction--image"
        />
        <div className="home__introductionInner">
          <h1>Share - Interact - Socialize - Inspire</h1>
          <p>
            Medi@holic is a trending social media platform where you post,
            interact and share with likeminded!
          </p>
          {auth ? (
            <>
              <h5>Hello User!</h5>
              <Button href="/Dashboard">Dashboard</Button>
            </>
          ) : (
            <Button href="/login">Login</Button>
          )}

          <Button href="/register">New user?</Button>
        </div>
      </div>
    </>
  );
}
