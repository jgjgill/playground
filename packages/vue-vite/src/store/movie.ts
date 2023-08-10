import { defineStore } from 'pinia'

export type Movies = Movie[]
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = defineStore('movie', {
  state: () => ({ movies: [] as Movies }),
  getters: {
    filteredMovies(state) {
      return state.movies
        .filter((movie) => Number(movie.Year) >= 2010)
        .sort((a, b) => Number(b.Year) - Number(a.Year))
    }
  },
  actions: {
    async fetchMovies(title: string) {
      const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}`)
      const { Search } = await res.json()
      this.movies = Search
    }
  }
})
