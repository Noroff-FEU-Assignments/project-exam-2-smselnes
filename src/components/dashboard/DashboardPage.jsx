import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Button, Modal } from "react-bootstrap";

import AuthContext from "../../context/AuthContext";
import Heading from "../layout/Heading";
import SubHeading from "../layout/SubHeading";

export default function DashboardPage() {
  let { name } = useParams();
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <Heading heading="Good day" />
      <SubHeading subHeading={auth.name} />
      <ul className="dashboard__menu">
        <li className="dashboard__menu--link">
          <a href="/dashboard/posts">View posts</a>
        </li>
        <li className="dashboard__menu--link">
          {" "}
          <a href="/dashboard/profiles">View profiles</a>
        </li>
        <li className="dashboard__menu--link">
          <a href="/dashboard/createpost">Create post</a>
        </li>
      </ul>
      <Button href={`/dashboard/${auth.name}`}>My profile</Button>
    </>
  );
}
