<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import genreStore from '@/stores/genre.js';

const router = useRouter()
const isLoading = ref(false);
const TV = ref([]);
const genres = ref([]);
const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name;
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

function openTV(TVId) {
  router.push({ name: 'TVDetails', params: { TVId } });
}

const listTV = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  TV.value = response.data.results
  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})
</script>

<template>
  <h1>Séries</h1>
  
  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listTV(genre.id)" @keypress.enter="listTV(TV.id)" class="genre-item">
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />

  <div class="TV-list">
    <div tabindex="0" v-for="TV in TV" :key="TV.id" @keypress.enter="listTV(tv.id)" class="TV-card">
      <img :src="`https://image.tmdb.org/t/p/w500${TV.poster_path}`" :alt="TV.title" @click="openTV(TV.id)" />
      <div class="TV-details">
        <p class="TV-title">{{ TV.name }}</p>
        <p class="TV-release-date">{{ formatDate(TV.first_air_date) }}</p>
        <p class="TV-genres">
          <span tabindex="0" v-for="genre_id in TV.genre_ids" :key="genre_id" @keypress.enter="listTV(genre_id)" @click="listTV(genre_id)">
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.TV-list{  
  
  display: flex;
  justify-content: center;
  

}
.TV-genres{
  display: flex;
  justify-content: center;
}
</style>
  