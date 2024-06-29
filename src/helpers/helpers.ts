import {Movie} from "../type/movie.ts";

export const transformMovie = (movie): Movie => {
    const movieRating = movie.rating.imdb
    let colorRating = "gray";
    if (movieRating > 7) {
        colorRating = "green"
    } else if (movieRating > 3) {
        colorRating = "#bbbb1f"
    } else if (movieRating > 0) {
        colorRating = "#b62323"
    }
    const countries = []
    if (movie.countries) {
        for (const element of movie.countries) {
            countries.push(element.name)
        }
    }
    const genres = []
    if (movie.genres) {
        for (const element of movie.genres) {
            genres.push(element.name)
        }
    }

    return {
        "id": movie.id,
        "name": movie.name,
        "alternativeName": movie.alternativeName,
        "type": movie.type,
        "year": movie.year,
        "description": movie.description,
        "rating": {
            "rate": movieRating,
            "color": colorRating
        },
        "ageRating": movie.ageRating,
        "posterUrl": movie.poster?.url || null,
        "genres": genres,
        "countries": countries,
        "persons": movie?.persons || null
    }
}
export const converterMoviesCard = (moveDTO: any[]): [] => {
    const movies = [];
    const moviesArr = moveDTO.docs;
    for (const movieElement of moviesArr) {
        const movie = transformMovie(movieElement)
        movies.push(movie)
    }
    return movies
}


export const generationQueryMovieByYear = (propsYear: string[]) => {
    const year = propsYear.slice()
    year.sort((a, b) => a - b)
    let dataToQuery = ""
    for (const element of year) {
        const numb = Number(element)
        if (!isNaN(numb)) {
            if (numb >= 1990 && numb<=2050) {
                if (dataToQuery !== "") {
                    dataToQuery += "-" + numb
                } else {
                    dataToQuery += numb
                }
            }
        }
    }
    return dataToQuery === ""
        ? ""
        : `&year=${dataToQuery}`
}
export const generationQueryMovieByRatingImdb = (propsRating: string[]) => {
    const rating = propsRating.slice()
    rating.sort((a, b) => a - b)
    let dataToQuery = ""
    for (const element of rating) {
        let numb = element !== "" ? Number(element) : -1
        if (!isNaN(numb)) {
            if (numb >= 0) {
                if (numb > 10) {
                    numb = 10
                }
                if (dataToQuery !== "") {
                    dataToQuery += "-" + numb
                } else {
                    dataToQuery += numb
                }
            }
        }
    }
    return dataToQuery === ""
        ? ""
        : `&rating.imdb=${dataToQuery}`
}
export const generationQueryMovieByGenres = (genres: string[]) => {
    const dataToQuery = []
    for (const genre of genres) {
        dataToQuery.push(`&genres.name=%2B${encodeURI(genre)}`)
    }
    return dataToQuery.join("")
}