import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store.ts";
import {MovieFilters} from "../type/movieFilters.ts";

const initialState = {
    filters: {
        rating: [],
        genres: [],
        year: []
    },
    isFilters: false
}

const movieFiltersSlice = createSlice({
    name: "movieFilters",
    initialState: initialState,
    reducers: {
        activeMovieFilters: (state, {payload: filters}: { payload: MovieFilters }) => {
            state.isFilters = true;
            state.filters = filters
        },
        deactivateMovieFilters: (state) => {
            state.filters = {
                rating: [],
                genres: [],
                year: []
            };
            state.isFilters = false
        },
    }
})
export const {actions, reducer} = movieFiltersSlice;

export const selectMovieFilters = (state: RootState) => state.movieFilters
