export interface Movie {
    id: number,
    name: string | null,
    alternativeName: string | null,
    type: string | null,
    year: number | null,
    description: string | null,
    rating: {
        rate: number | null,
        color: string | null
    },
    ageRating: number | null,
    posterUrl: string | null,
    genres: string[] | null,
    countries: string[] | null,
    persons: any | null
}