import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
// icons
import logowhite from "../assets/bookamoviewhite.svg";
import { CgLogIn } from "react-icons/cg";
import { CgShoppingCart } from "react-icons/cg";
import { useState } from "react";
function OffcanvasExample() {
  const handleImageErr = (e) => {
    e.target.src =
      "https://i.pinimg.com/736x/c2/5a/83/c25a838aa58df060864f44400b945b3b.jpg";
  };
  const [title, setTitle] = useState("");
  return (
    <>
      <Navbar key="sm" expand="sm" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={logowhite}
              alt="logo"
              className="center"
              style={{
                height: "40px",
              }}
              onError={(e) => {
                handleImageErr(e);
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Contact</Nav.Link>
              </Nav>

              <Nav.Link>
                <ButtonToolbar>
                  <ButtonGroup className="me-2 ">
                    <Button className="d-flex align-items-center p-2">
                      <CgShoppingCart size="1.5em" />
                      <Badge bg="secondary">0</Badge>
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup className="me-2 pt-0 ">
                    <Button
                      className="d-flex align-items-center p-2"
                      variant="danger"
                    >
                      <CgLogIn size="1.5em" />
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Nav.Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;
