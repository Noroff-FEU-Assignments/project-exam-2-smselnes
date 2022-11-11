import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function BreadcrumbNavigation() {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {auth ? (
        <>
          <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
        </>
      ) : (
        <Breadcrumb.Item href="/login">Login</Breadcrumb.Item>
      )}
      {auth ? (
        <>
          <Breadcrumb.Item href={`/dashboard/${auth.name}`}>
            Profile
          </Breadcrumb.Item>
        </>
      ) : (
        ""
      )}
    </Breadcrumb>
  );
}

export default BreadcrumbNavigation;
