import {Link} from "react-router-dom";
import "./dropdown-content.scss"
export const DropdownContentFavoriteMovie = ({text, value}:{text:string, value:number}) => {
    return (
        <li key={value} className="dropdown-content">
            <Link className="movie-link" to={`/movie/${value}`}>
                <p>{text}</p>
            </Link>

        </li>
    )
}