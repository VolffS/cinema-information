import {useParams} from "react-router";
import plugImg from "../../assets/plug-img.svg";
import "./movie-description.scss"
import starSvg from "../../assets/star.svg"
import favoriteSvg from "../../assets/favorit.svg";
import favoriteActivSvg from "../../assets/favoritadd.svg";
import {useGetMovieByIdQuery} from "../../api/api.ts";
import {useEffect, useMemo, useState} from "react";
import {LoaderAllSpace} from "../loader/loaderAllSpace.tsx";
import {useFavoritesMoviesAction} from "../../hooks/use-favorites-movies-action.ts";
import {ErrorPage} from "../error/error-page.tsx";
import {useSelector} from "react-redux";
import {selectFavoritesMovies} from "../../store/favorites-movies-slice.ts";

export const MovieDescription = () => {
    const param = useParams()
    const {data: film, isLoading, isSuccess, error} = useGetMovieByIdQuery(param.movieId);
    const memoMovie = useMemo(() => film, [film])
    const [isFavoriteMovie, setIsFavoriteMovie] = useState<boolean>(false)

    const actionMovies = useFavoritesMoviesAction()
    const favoritesMovies = useSelector(selectFavoritesMovies)

    useEffect(()=>{
        for (const movie of favoritesMovies) {
            if (movie.id==param.movieId) {
                setIsFavoriteMovie(true)
            }
        }
    },[])

    const btnHandler = () => {
        const favoriteMovie = {
            id: memoMovie.id,
            name: memoMovie.name || memoMovie.alternativeName,
            year: memoMovie.year,
            rating: memoMovie.rating,
            posterUrl: memoMovie.posterUrl,
        }
        actionMovies.toggleFavoriteMovie(favoriteMovie);
        setIsFavoriteMovie(!isFavoriteMovie)
    }

    if (isLoading && !isSuccess)
        return <LoaderAllSpace/>

    if (film === undefined)
        return <h1>Фильм не найден</h1>

    if (error)
        return <ErrorPage error={error}/>

    return (
        <>
            <div className="about-movie">
                <div className="movie-img">
                    <img className="movie__poster" src={memoMovie.posterUrl || plugImg} alt=""/>
                    <div className="movie-card__rating" style={{background: memoMovie.rating.color}}>
                        <img className="rating__img" src={starSvg} alt=""/>
                        <p className="rating__text">{memoMovie.rating.rate}</p>
                    </div>
                </div>
                <div className="movie__information">
                    <p className="movie__title">{memoMovie.name || memoMovie.alternativeName} ({memoMovie.year})</p>
                    {memoMovie.ageRating && <p className="movie__age-rating">{memoMovie.ageRating}+</p>}
                    <button className={`movie__btn-favorites ${isFavoriteMovie ? "active-favorit" : "disable-favorit"}`}
                            onClick={btnHandler}>

                        <img className="btn-favorites__img" src={isFavoriteMovie ? favoriteActivSvg : favoriteSvg}
                             alt=""/>
                        <p>{isFavoriteMovie ? "Убрать из избранного" : "Добавить в избранное "}</p>
                    </button>
                    <p className="short-description__title"> О фильме </p>
                    <div className="movie__short-description">
                        <p>Страна</p>
                        <p>{memoMovie.countries}</p>
                        <p>Год выпуска</p>
                        <p>{memoMovie.year}</p>
                        <p>Тип</p>
                        <p>{memoMovie.type}</p>
                        <p>Жанры</p>
                        <p>{memoMovie.genres.join(", ")}</p>
                        <p>Возраст</p>
                        <p>{memoMovie.ageRating || "-"}</p>
                    </div>
                </div>
            </div>
            <div className="movie__description">
                <p className="description__title">Описание</p>
                {memoMovie.description
                    ? <p>{memoMovie.description}</p>
                    : <p>Описания на данный момент отсутствует </p>
                }
                <p className="description__title">Актёры</p>
                <div className="movie__actors">
                    {memoMovie.persons.map((actor) =>
                        <div className="actors-card" key={actor.id}>
                            <img className="actors__photo" src={actor.photo} alt=""/>
                            <p className="actor-name">{actor.name || actor.enName}</p>
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}