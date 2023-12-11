<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
const movieStore = useMovieStore();

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId);
});

</script>

<template>
  <div class="main">
    <div class="content">
      <div class="fundo">
      <img :src="`https://image.tmdb.org/t/p/w300${movieStore.currentMovie.poster_path}`" :alt="movieStore.currentMovie.title" />
      </div>
      <div class="details">
        <h1>Filme: {{ movieStore.currentMovie.title }}</h1>
        <p>{{ movieStore.currentMovie.tagline }}</p>
        <div class="sobreMovie">
        <p>{{ movieStore.currentMovie.overview }}</p>
        </div>
        <p>Orçamento: ${{ movieStore.currentMovie.budget }}</p>
        <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
      </div>
    </div>
  </div>
  <div class="prod">
  <div>
    <h1>Produtoras:</h1>
  </div>
  <div class="companies">
    <template v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
      <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`" :alt="company.name" />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
  </div>
</template>

<style scoped>

.fundo{
  background-image: url(../assets/banner.png);
  background-repeat: no-repeat;
  width: 100%;
  height: 460px;
  background-position-x: center;
  background-position-y: center;
  background-size: 100%;
}

h1{
  margin-top: 50px;
}
</style>