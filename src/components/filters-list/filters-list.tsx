import {Dropdown} from "../dropdown/dropdown.tsx";
import {DropdownContentGenre} from "../dropdown-content/dropdownContentGenre.tsx";
import {Genres} from "../../type/genres.ts";
import {useMovieFiltersAction} from "../../hooks/use-movie-filters-action.ts";
import {ChangeEvent, createRef, useRef, useState} from "react";
import {MovieFilters} from "../../type/movieFilters.ts";
import "./filters-list.scss"
import {useSelector} from "react-redux";
import {selectMovieFilters} from "../../store/movie-filters-slice.ts";

export const FiltersList = ({genres, btnApplyFilter}: { genres: Genres[], btnApplyFilter: () => void }) => {
    const movieFiltersAction = useMovieFiltersAction();
    const {isFilters, filters} = useSelector(selectMovieFilters)
    const movieFilters = useRef<MovieFilters>({
        rating: [],
        genres: filters.genres.slice(),
        year: []
    });
    const inputRatingStart = createRef()
    const inputRatingEnd = createRef()
    const inputYearStart = createRef()
    const inputYearEnd = createRef()
    const btnHandlerActiveFilter = () => {
        const filters = {...movieFilters.current};
        filters.year = [inputYearStart.current?.value, inputYearEnd.current?.value]
        filters.rating = [inputRatingStart.current?.value, inputRatingEnd.current?.value]
        movieFiltersAction.activeMovieFilters(filters)
        btnApplyFilter()
        movieFilters.current = filters;
    }
    const btnHandlerDisableFilter = () => {
        movieFiltersAction.deactivateMovieFilters()
    }

    const toggleSelectGenre = (genre: string, element: HTMLInputElement) => {
        const filters = movieFilters.current;
        if (element.checked) {
            filters.genres.push(genre);
        } else {
            for (let i = 0; i < filters.genres.length; i++) {
                if (filters.genres[i] === genre) {
                    filters.genres.splice(i, 1);
                }
            }
        }
        movieFilters.current = filters;
    }

    return (
        <div className="block-filters">
            <div className="filters">
                <div className="filter-genre">
                    <p className="filter-text">Жанры</p>
                    <Dropdown text={"Выбор"} Children={() =>
                        genres.map((genre) => {
                            let isActiveGenre = false
                            if (filters?.genres) {
                                for (const activeGenre of filters.genres) {
                                    if (activeGenre == genre.name) {
                                        isActiveGenre = true
                                    }
                                }
                            }
                            return <DropdownContentGenre key={genre.slug} genre={genre}
                                                         toggleSelectGenre={toggleSelectGenre}
                                                         activeGenre={isActiveGenre}/>
                        })
                    }
                    />
                </div>

                <div className="filter-year">
                    <p className="filter-text">Год выпуска</p>
                    <div className="filter__input">
                        <InputFilter value={isFilters ? filters.year[0] : ""} maxLength={4} placeholder={"От 1990"}
                                     refComponent={inputYearStart}/>
                        <p className="">-</p>
                        <InputFilter value={isFilters ? filters.year[1] : ""} maxLength={4} placeholder={"До 2024"}
                                     refComponent={inputYearEnd}/>
                    </div>
                </div>

                <div className="filter-rating">
                    <p className="filter-text">Рейтинг</p>
                    <div className="filter__input">
                        <InputFilter value={isFilters ? filters.rating[0] : ""} maxLength={1} placeholder={"От 0"}
                                     refComponent={inputRatingStart}/>
                        <p className="">-</p>
                        <InputFilter value={isFilters ? filters.rating[1] : ""} maxLength={2} placeholder={"До 10"}
                                     refComponent={inputRatingEnd}/>
                    </div>
                </div>
                <button className="btn btn-filter" onClick={btnHandlerActiveFilter}>Применить</button>
                {isFilters && <button className="btn btn-filter" onClick={btnHandlerDisableFilter}>Отмена</button>}
            </div>
        </div>
    )
}

export const InputFilter = ({placeholder, maxLength, value, refComponent}) => {
    const [text, setText] = useState<string>(value)
    const inputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setText(ev.currentTarget.value)
    }

    return (
        <input type="text" ref={refComponent} maxLength={maxLength} value={text}
               placeholder={placeholder} onChange={(ev) => inputChange(ev)}/>
    )
}