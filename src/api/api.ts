
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
    converterMoviesCard,
    generationQueryMovieByGenres,
    generationQueryMovieByRatingImdb,
    generationQueryMovieByYear,
    transformMovie
} from "../helpers/helpers.ts";
import {Movie} from "../type/movie.ts";
import {Genres} from "../type/genres.ts";
import {MovieFilters} from "../type/movieFilters.ts";
import {PageMovie} from "../type/page-movie.ts";

const baseUrl: string = 'https://api.kinopoisk.dev';

const getResponseWithTimeoutMovies = <Result>(response: BaseQueryResult<Result>): Promise<Result> | Result =>
    new Promise(resolve => {
        setTimeout(() => {
            const movies = converterMoviesCard(response)
            resolve(movies)
        }, 500)
    })
const getResponseWithTimeoutMoviesById = <Result>(response: BaseQueryResult<Result>): Promise<Result> | Result =>
    new Promise(resolve => {
        setTimeout(() => {
            const movies = transformMovie(response)
            resolve(movies)
        }, 500)
    })
export const api = createApi({
    reducerPath: "api",
    tagTypes: ['refreshMovie'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        headers: {
            "X-API-KEY": import.meta.env.VITE_API_KEY
        },
        mode: "cors"
    }),
    endpoints: (builder) => ({
        getMovie: builder.query<Movie[], undefined>({
            query: (pageMovies:number) => `/v1.4/movie?page=${pageMovies}&limit=50`,
            transformResponse: getResponseWithTimeoutMovies
        }),
        getMovieById: builder.query<Movie, number>({
            query: (movieId: number) => `/v1.4/movie/${movieId}`,
            transformResponse: getResponseWithTimeoutMoviesById
        }),
        getMovieByFilter: builder.query<Movie[], string>({
            query: (filter: MovieFilters & PageMovie) => `/v1.4/movie?page=${filter.pageMovie}&limit=50${generationQueryMovieByYear(filter.year)}${generationQueryMovieByRatingImdb(filter.rating)}${generationQueryMovieByGenres(filter.genres)}`,
            transformResponse: getResponseWithTimeoutMovies
        }),
        getMovieGenres: builder.query<Genres[], undefined>({
            query: () => `/v1/movie/possible-values-by-field?field=genres.name`
        }),
    })
})

export const {useGetMovieQuery, useGetMovieByIdQuery, useGetMovieByFilterQuery, useGetMovieGenresQuery} = api





