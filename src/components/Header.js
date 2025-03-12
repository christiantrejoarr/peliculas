import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../styles/header.css';

export default function Header() {
    return (
        <>
            <Navbar className="navbar-custom" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Demo Streaming</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="#login">Log In</Nav.Link>
                        <Button variant="light" className="ml-2">Start your free trial</Button>
                    </Nav>
                </Container>
            </Navbar>
            <div className="popular-titles">
                <Container>
                    <h5>Popular titles</h5>
                </Container>
            </div>
        </>
    );
}