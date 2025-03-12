import { Link } from 'react-router-dom';

export default function Index() {
    return (
        <div>
            <h1>Películas</h1>
            <p>Explora nuestra colección de películas.</p>
            <nav>
                <ul>
                    <li><Link to="/series">Series</Link></li>
                    <li><Link to="/peliculas">Películas</Link></li>
                </ul>
            </nav>
        </div>
    );
}