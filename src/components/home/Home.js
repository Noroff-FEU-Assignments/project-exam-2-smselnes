import React from "react";
import banner from "../../assets/banner_vertical.jpg";
import { Button, Container } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../layout/Heading";

export default function Home() {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <>
      <div className="home__introduction">
        <Heading heading="Share, Interact, Socialize, Inspire!" />
        <p>
          Medi@holic is a trending social media platform where you post,
          interact and share with likeminded!
        </p>

        {auth ? (
          <>
            <h5>Welcome back {auth.name}!</h5>
            <Button href="/dashboard">My pages</Button>
          </>
        ) : (
          <Button href="/login">Login</Button>
        )}

        <Button href="/register" className="m-3">
          New user?
        </Button>
        <img
          src={banner}
          alt="big smiley with hearty eyes looking to left"
          className="home__introduction--image"
        />
      </div>
    </>
  );
}
