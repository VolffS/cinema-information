import starSVG from "../../assets/star.svg";
import plugImg from "../../assets/plug-img.svg";
import {Link} from "react-router-dom";
import {useMemo} from "react";
import {Movie} from "../../type/movie.ts";
import "./movie-card.scss"

export const MovieCard = ({movie}: { movie: Movie }) => {
    const memoMovie = useMemo(() => movie, [movie])


    return (
        <div className="movie-card">
            <Link className="movie-card__link" to={`/movie/${memoMovie.id}`}/>
            <div className="movie-card__rating" style={{background: memoMovie.rating.color}}>
                <img className="rating__img" src={starSVG} alt=""/>
                <p className="rating__text">{memoMovie.rating.rate}</p>
            </div>
            <img className="movie-card__poster" src={memoMovie.posterUrl || plugImg} alt=""/>
            <div className="movie-card__title">
                <p className="movie-card__name">{memoMovie.name || memoMovie.alternativeName} <br/> ({memoMovie.year})</p>
            </div>
        </div>
    )
}