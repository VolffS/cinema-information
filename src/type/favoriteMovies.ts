export interface FavoriteMovies {
    id: number,
    name: string | null,
    year: string | null,
    rating: {
        rate: number | null,
        color: string | null
    },
    posterUrl: string | null,
}