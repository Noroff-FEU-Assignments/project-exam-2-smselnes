import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo.png";

function Navigation() {
  return (
    <Navbar className="navbar" expand="sm">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} className="navbar__logo" />
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
            <Nav.Link href="/login" className="navbar__link">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
