import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  const locate = useLocation();

  const [path] = useState(locate.pathname);

  function logoutUser() {
    setAuth(null);
    navigate("/");
  }

  return (
    <>
      <Navbar className="navbar" expand="md">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              className="navbar__logo"
              alt="the brand logo, mediaholic styled with white fonts and sans-serif type"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="navbar-dark"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="" activeKey={path}>
              {auth ? (
                <>
                  <Nav.Link href="/" className="navbar__link">
                    Home
                  </Nav.Link>

                  <Nav.Link href="/dashboard" className="navbar__link">
                    Dashboard
                  </Nav.Link>

                  <Nav.Link
                    href={`/dashboard/${auth.name}`}
                    className="navbar__link"
                  >
                    My profile
                  </Nav.Link>

                  <Nav.Link onClick={logoutUser} className="navbar__logout">
                    Logout
                    <RiLogoutCircleRLine />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/" className="navbar__link">
                    Home
                  </Nav.Link>

                  <Nav.Link href="/register" className="navbar__link">
                    Register
                  </Nav.Link>

                  <Nav.Link href="/login" className="navbar__link">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
