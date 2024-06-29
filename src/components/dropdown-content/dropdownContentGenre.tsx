import {Genres} from "../../type/genres.ts";
import "./dropdown-content.scss"
import {ChangeEvent, useState} from "react";

export const DropdownContentGenre = ({genre, toggleSelectGenre, activeGenre}: {
    genre: Genres,
    activeGenre: boolean,
    toggleSelectGenre: (genre: string, element: HTMLInputElement) => void
}) => {
    const [isChecked, setIsChecked] = useState(activeGenre)
    const btnChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        toggleSelectGenre(genre.name, ev.currentTarget)
        setIsChecked(!isChecked)
    }

    return (
        <li className="dropdown-content">
            <input type="checkbox" onChange={btnChangeHandler} id={genre.slug} name="genres" value={genre.name}
                   checked={isChecked}/>
            <label htmlFor={genre.slug}>{genre.name}</label>
        </li>
    )
}

