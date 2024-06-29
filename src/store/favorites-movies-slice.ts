import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store.ts";
import {FavoriteMovies} from "../type/favoriteMovies.ts";

let initialState: FavoriteMovies = []
const favoriteMovieLocalStorage = JSON.parse(localStorage.getItem("myFavoriteMovie"))

if (favoriteMovieLocalStorage) initialState = favoriteMovieLocalStorage


const favoritesMoviesSlice = createSlice({
    name: "favoritesMovie",
    initialState: initialState,
    reducers: {
        toggleFavoriteMovie: (state, {payload: movie}: { payload: FavoriteMovies }) => {
            let isDouble = false
            for (let i = 0; i < state.length; i++) {
                if (state[i].id == movie.id) {
                    state.splice(i, 1)
                    isDouble = true
                }
            }
            if (!isDouble) state.push(movie)
            localStorage.setItem("myFavoriteMovie", JSON.stringify(state))
        }
    }
})
export const {actions, reducer} = favoritesMoviesSlice;

export const selectFavoritesMovies = (state: RootState) => state.favoritesMoviesSlice;

