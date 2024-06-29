import {MovieCard} from "../movie-card/movie-card.tsx";
import "./movie-list.scss"
import {useMemo, useState} from "react";
import {FiltersList} from "../filters-list/filters-list.tsx";
import {Movie} from "../../type/movie.ts";
import {useGetMovieByFilterQuery, useGetMovieGenresQuery, useGetMovieQuery} from "../../api/api.ts";
import {LoaderAllSpace} from "../loader/loaderAllSpace.tsx";
import {ErrorPage} from "../error/error-page.tsx";
import {useSelector} from "react-redux";
import {selectMovieFilters} from "../../store/movie-filters-slice.ts";
import arrowSvg from "../../assets/arrow.svg"

let movie = undefined;

export const MovieList = () => {
    const [pageMovie, setPageMovie] = useState<number>(1)
    const {isFilters, filters} = useSelector(selectMovieFilters)
    const {data, isLoading: isLoadingMovie, isSuccess: isSuccessMovie, isFetching: isFetchingMovie, error: errorMovie} = useGetMovieQuery(pageMovie,
        {
            skip: isFilters
        }
    );
    const {
        data: dataFilter,
        isLoading: isLoadingMovieFilter,
        isSuccess: isSuccessMovieFilter,
        isFetching: isFetchingMovieFilter,
        error: errorFilter
    } = useGetMovieByFilterQuery({...filters, pageMovie: pageMovie},
        {
            skip: !isFilters
        }
    )
    const {data: genres, isLoading: isLoadingGenres, isSuccess} = useGetMovieGenresQuery(undefined);

    const btnHandlerPageMovie = (numb: number) => {
        if (!(pageMovie === 1 && numb < 0)) {
            setPageMovie(pageMovie + numb)
        }
    }

    if (isFilters) {
        movie = dataFilter
    } else {
        movie = data
    }
    const memoMovie: Movie[] = useMemo(() => movie, [movie])


    if (isLoadingMovie || isLoadingGenres || isLoadingMovieFilter || isFetchingMovie || isFetchingMovieFilter)
        return <LoaderAllSpace/>

    if ((isSuccessMovie || isSuccessMovieFilter) && isSuccess && memoMovie.length === 0)
        return <div className="post">Ничего не найдено</div>

    if (errorMovie || errorFilter)
        return <ErrorPage error={errorFilter || errorMovie}/>

    return (
        <>
            <FiltersList genres={genres} btnApplyFilter={() => setPageMovie(1)}/>

            <div className="content__movies">
                {memoMovie.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
            <div className="block-page-navigation">
                <button className="page-navigation page-back" onClick={()=>btnHandlerPageMovie(-1)}>
                    <img src={arrowSvg} alt=""/>
                </button>
                {pageMovie}
                <button className="page-navigation page-forward" onClick={()=>btnHandlerPageMovie(1)}>
                    <img src={arrowSvg} alt=""/>
                </button>
            </div>
        </>
    )
}