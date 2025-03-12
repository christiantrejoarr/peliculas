import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../Features/MoviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer, // Agrega el reducer de películas
  },
});