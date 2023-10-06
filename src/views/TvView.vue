<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const TV = ref([]);
const genres = ref([])

const listTV = async (genreId) => {
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  TV.value = response.data.results
};

onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR')
  genres.value = response.data.genres
})
</script>

<template>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
      <li v-for="genre in genres" :key="genre.id" @click="listTV(genre.id)" class="genre-item">
          {{ genre.name }}
      </li>
    </ul>

    <div class="TV-list">
    <div v-for="TV in TV" :key="TV.id" class="TV-card">

      <img :src="`https://image.tmdb.org/t/p/w500${TV.poster_path}`" :alt="TV.title" />
      <div class="TV-details">
        <p class="TV-title">{{ TV.name }}</p>
        <p class="TV-release-date">{{ TV.first_air_date }}</p>
        <p class="TV-genres" v-for="genre in genres" :key="genre.id">{{ genre.name }}</p>
      </div>
    </div>
  </div>

  </template>
  
  <style scoped>
  .TV-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .TV-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
  }
  
  .TV-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
  }
  
  .TV-details {
    padding: 0 0.5rem;
  }
  
  .TV-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
  }
  
  .genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    margin-bottom: 2rem;
  }
  
  .genre-item {
    background-color: #387250;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: #fff;
  }
  
  .genre-item:hover {
    cursor: pointer;
    background-color: #4e9e5f;
    box-shadow: 0 0 0.5rem #387250;
  }
  </style>