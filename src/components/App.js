import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Series from '../Pages/Series';
import Peliculas from '../Pages/Peliculas';
import NotFound from '../Pages/NotFound';
import Index from '../Pages/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'; 

export default function App() {
    return (
        <div className="app-container">
            <Header />

            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/series" element={<Series />} />
                <Route path="/peliculas" element={<Peliculas />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </div>
    );
}