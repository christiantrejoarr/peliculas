import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies } from './MoviesApi';
// Estado inicial
const initialState = {
  movies: [],
  status: 'idle', 
  error: null,
};

export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await fetchMovies();
    return response;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMoviesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;