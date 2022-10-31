import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logoutUser() {
    setAuth(null);
    navigate("/login");
  }

  return (
    <Navbar className="navbar" expand="sm">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            className="navbar__logo"
            alt="the brand logo, mediaholic styled with white fonts and sans-serif type"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link href="/" className="navbar__link">
              Home
            </Nav.Link>
            <Nav.Link href="/register" className="navbar__link">
              Register
            </Nav.Link>
            {auth ? (
              <>
                <Nav.Link href="/dashboard" className="navbar__link">
                  Dashboard
                </Nav.Link>
                <Button className="navbar__logout" onClick={logoutUser}>
                  Log out
                </Button>
              </>
            ) : (
              <Nav.Link href="/login" className="navbar__link">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
