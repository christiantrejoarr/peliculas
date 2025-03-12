import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMoviesAsync } from "../Features/MoviesSlice";
import { useEffect, useState } from "react";
import { Table, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Series() {
    const dispatch = useDispatch();
    const { movies, status, error } = useSelector((state) => state.movies);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

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

    if (status === 'succeeded') {
        const filteredMovies = movies && Array.isArray(movies.entries) 
            ? movies.entries.filter(movie => movie.programType === "series") 
            : [];

        const offset = currentPage * itemsPerPage;
        const currentItems = filteredMovies.slice(offset, offset + itemsPerPage);

        return (
            <Container>
                <h1>Series</h1>
                <p>Bienvenido a la página de series. Aquí encontrarás tus series favoritas.</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Título</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((movie, index) => (
                            <tr key={index}>
                                <td><img src={movie.images['Poster Art'].url} alt="Poster" style={{ width: '50px', height: '75px' }} /></td>
                                <td>{movie.title}</td>
                                <td>{movie.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filteredMovies.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </Container>
        );
    }

    return null;
}