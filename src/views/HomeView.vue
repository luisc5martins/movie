<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import genreStore from '@/stores/genre.js';

const isLoading = ref(false);
const movies = ref([]);
const TV = ref([]);
const genres = ref([]);
const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name;
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const listMovies = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results
  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  isLoading.value = false
})
</script>

<template>
  <h1>Home</h1>
  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" class="genre-item">

      {{ genre.name }}

    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />

  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id">
            {{ genreStore.getGenreName(genre_id) }}
          </span>

        </p>
      </div>

    </div>
  </div>
</template>

