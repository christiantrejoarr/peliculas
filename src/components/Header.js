import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; 
import '../styles/header.css';

export default function Header() {
    const location = useLocation(); 

    const getTitle = () => {
        if (location.pathname === "/series") {
            return "Popular Series";
        } else if (location.pathname === "/peliculas") {
            return "Popular Movies";
        } else {
            return "Popular Titles"; 
        }
    };

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
                    <h5>{getTitle()}</h5> 
                </Container>
            </div>
        </>
    );
}