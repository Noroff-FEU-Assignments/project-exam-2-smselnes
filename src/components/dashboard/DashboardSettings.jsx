import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function DashboardSettings() {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);

  function logoutUser() {
    setAuth(null);
    navigate("/login");
  }
  return (
    <div className="dashboardSettings">
      <Button href="/dashboard/settings">Settings</Button>
      <Button onClick={logoutUser}>Log out</Button>
    </div>
  );
}
