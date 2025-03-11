import {Container, Nav, Navbar } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./Header.css";

const Header = () => {
    return (
        <Navbar expand="lg" className="text-bg-dark navbar-dark">
            <Container>
                <Navbar.Brand>GameDatabase</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/games">
                            <Nav.Link>Games</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/developers">
                            <Nav.Link>Developers</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;