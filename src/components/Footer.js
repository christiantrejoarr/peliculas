import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
    return (
        <footer>
            <Container>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#terms">Terms and Conditions</a></li>
                    <li><a href="#privacy">Privacy Policy</a></li>
                </ul>
            </Container>
        </footer>
    );
}