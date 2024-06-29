import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as favoriteMovieSliceReducer} from "./favorites-movies-slice.ts";
import {reducer as movieFiltersReducer} from "./movie-filters-slice.ts";
import {api} from "../api/api.ts";

const reducers = combineReducers({
    [api.reducerPath]: api.reducer,
    favoritesMoviesSlice: favoriteMovieSliceReducer,
    movieFilters: movieFiltersReducer,
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;