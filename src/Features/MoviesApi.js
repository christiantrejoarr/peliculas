export const fetchMovies = async () => {
    const response = await fetch('https://api.npoint.io/546fd85e8651aa8e648a'); 
    if (!response.ok) {
      throw new Error('Error al obtener las películas');
    }
    const data = await response.json();
    return data;
  };