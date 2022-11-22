import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function LogoutButton() {
  const [, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logoutUser() {
    setAuth(null);
    navigate("/login");
  }

  return (
    <button onClick={logoutUser} className="button m-3">
      Log out
    </button>
  );
}
