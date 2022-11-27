import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Alert } from "react-bootstrap";

export default function LogoutUser() {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logoutUser() {
    setAuth(null);
    navigate("/");
  }

  return (
    <>
      <Alert className="ownPost__delete--alert" show={show}>
        <Alert.Heading>Confirm log out?</Alert.Heading>
        <button
          onClick={logoutUser}
          className="button ownPost__delete--confirm m-3"
        >
          Yes
        </button>
        <button
          onClick={() => {
            setShow(false);
          }}
          className="button ownPost__delete--cancel m-3"
        >
          No
        </button>
      </Alert>
    </>
  );
}
