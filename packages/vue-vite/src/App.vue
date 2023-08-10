<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from './store/movie'

const movieStore = useMovieStore()
const title = ref('')

async function searchMovies() {
  await movieStore.fetchMovies(title.value)
  console.log(movieStore.movies)
}

function resetMovies() {
  title.value = ''
  movieStore.$reset()
  console.log(movieStore.movies)
}
</script>

<template>
  <input
    v-model="title"
    @keydown.enter="searchMovies" />

  <button @click="searchMovies">Search</button>
  <button @click="resetMovies">Reset</button>
  <ul>
    <li
      v-for="movie in movieStore.filteredMovies"
      :key="movie.imdbID">
      {{ movie.Title }}
      {{ movie.Year }}
    </li>
  </ul>
</template>
