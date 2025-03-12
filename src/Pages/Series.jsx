import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMoviesAsync } from "../Features/MoviesSlice";
import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/series.css';

export default function Series() {
    const dispatch = useDispatch();
    const { movies, status, error } = useSelector((state) => state.movies);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [yearFilter, setYearFilter] = useState(null);  
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [showModal, setShowModal] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        dispatch(fetchMoviesAsync());
    }, [dispatch]);

    if (status === 'loading') {
        return <p>Cargando películas...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleYearChange = (date) => {
        setYearFilter(date);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(0);
    };

    const handleTitleClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    if (status === 'succeeded') {
        const filteredMovies = movies && Array.isArray(movies.entries)
            ? movies.entries.filter(movie =>
                movie.programType === "series" && 
                (!yearFilter || movie.releaseYear === yearFilter.getFullYear()) && 
                (!yearFilter ? movie.releaseYear >= 2010 : true)
            )
            : [];
    
        const sortedMovies = filteredMovies.sort((a, b) => {
            if (a.title < b.title) return -1; 
            if (a.title > b.title) return 1;  
            return 0; 
        });
    
        const totalMovies = sortedMovies.length;
        const offset = currentPage * itemsPerPage;
        const currentItems = sortedMovies.slice(offset, offset + itemsPerPage);
    
        return (
            <Container ref={ref}>
                <Row className="g-3 mb-3">
                    <Col sm={6} md={4} lg={3}>
                        <Form.Group controlId="yearFilter">
                            <Form.Label>Filtrar por año</Form.Label>
                            <div className="d-flex flex-column">
                                <DatePicker
                                    selected={yearFilter}
                                    onChange={handleYearChange}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    placeholderText="Selecciona un año"
                                    className="form-control"
                                    yearItemNumber={12}
                                    minDate={new Date("1801-01-01")}
                                    maxDate={new Date()}
                                />
                            </div>
                        </Form.Group>
                    </Col>
    
                    <Col sm={6} md={4} lg={3}>
                        <Form.Group controlId="itemsPerPage">
                            <Form.Label>Resultados por página</Form.Label>
                            <Form.Control as="select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
    
                    <Col className="ms-auto">
                        <ReactPaginate
                            previousLabel={'Anterior'}
                            nextLabel={'Siguiente'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(totalMovies / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            previousClassName={'previous'}
                            nextClassName={'next'}
                        />
                    </Col>
                </Row>
    
                <Row className="g-4">
                    {currentItems.map((movie, index) => (
                        <Col key={index} sm={6} md={4} lg={3} xl={2}>
                            <Card onClick={() => handleTitleClick(movie)} style={{ cursor: 'pointer' }}>
                                <Card.Img variant="top" src={movie.images['Poster Art'].url} alt="Poster" />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
    
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedMovie?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedMovie && (
                            <div>
                                <img src={selectedMovie.images['Poster Art'].url} alt="Poster" style={{ width: '100%', marginBottom: '1rem' }} />
                                <p><strong>Año de lanzamiento:</strong> {selectedMovie.releaseYear}</p>
                                <p><strong>Descripción:</strong> {selectedMovie.description}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
    return null;
}