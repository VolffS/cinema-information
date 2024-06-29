import {MovieCard} from "../movie-card/movie-card.tsx";
import "../movie-list/movie-list.scss"
import {useMemo} from "react";
import {Movie} from "../../type/movie.ts";
import {useSelector} from "react-redux";
import {selectFavoritesMovies} from "../../store/favorites-movies-slice.ts";

export const FavoriteMovieList = () => {
    const movie = useSelector(selectFavoritesMovies)

    const memoMovie: Movie[] = useMemo(() => movie, [movie])

    if (memoMovie.length === 0)
        return <h1>Вы ещё не выбрали свои любимые фильмы</h1>

    return (
        <div className="content__movies">
            {memoMovie.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
    )
}