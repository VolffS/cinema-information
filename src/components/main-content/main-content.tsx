import "./main-content.scss"
import {useSelector} from "react-redux";
import {selectFavoritesMovies} from "../../store/favorites-movies-slice.ts";
import {Dropdown} from "../dropdown/dropdown.tsx";
import {DropdownContentFavoriteMovie} from "../dropdown-content/dropdownContentFavoriteMovie.tsx";

export const MainContent = ({Children}: { Children: () => JSX.Element }) => {
    const favoritesMovies = useSelector(selectFavoritesMovies)
    return (
        <main className="main__content">
            <div className="favorites-movie">
                <Dropdown text={"Избранные фильмы " + favoritesMovies.length}
                          Children={() => favoritesMovies.map((movie) =>
                              <DropdownContentFavoriteMovie key={movie.id+movie.name} text={movie.name} value={movie.id}/>
                          )}/>
            </div>
            <Children/>
        </main>
    )
}