import { Link } from 'react-router-dom';
import '../styles/index.css'; 

export default function Index() {
    return (
        <div className="index-container">
            <div className="button-container">
                <div className="button-wrapper">
                    <Link to="/series" className="button-link">
                        <div className="button-content">
                            <div className="button-title">Series</div>
                        </div>
                    </Link>
                    <div className="button-subtitle">Popular Series</div>
                </div>
                <div className="button-wrapper">
                    <Link to="/peliculas" className="button-link">
                        <div className="button-content">
                            <div className="button-title">Movies</div>
                        </div>
                    </Link>
                    <div className="button-subtitle">Popular Movies</div>
                </div>
            </div>
        </div>
    );
}