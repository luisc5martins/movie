<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import genreStore from '@/stores/genre.js';

const isLoading = ref(false);
const movies = ref([]);
const TV = ref([]);
const genres = ref([]);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const props = defineProps(['movies', 'titulo', 'subtitulo']);

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

    <div class="Populares">

        <div class="popularesCartaz">
            <div v-for="movie in movies" :key="movie.id" class="cartazDeMovie">
                <img class="poster-filme" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
                <div class="content">
                    <h3>{{ movie.title }}</h3>
                    <div class="info">
                        <p>{{ getShortText(movie.overview) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    (mudar endereços)

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

<style scoped>
.poster-filme:hover {
    opacity: 0.3;
    transition: 0.5s ease;
    backface-visibility: hidden;
}

.info {
    font-size: 15px;
}

.content {
    position: relative;
    bottom: 100%;
    display: none;
    opacity: 1;
    padding: 4% 6% 0 6%;
    font-size: 20px;
}

.content:hover+div {
    display: block;
}

.poster-filme {
    margin: 0 .4vw;
    height: 380px;
    display: block;
    opacity: 1;
}

.cartazDeMovie:hover .content {
    display: block;
}

.cartazDeMovie:hover .poster-filme {
    opacity: 0.3;
}


.popularesCartaz {
    display: flex;
    flex-direction: row;
    height: 27rem;
    background: rgb(92, 13, 172);
    background: linear-gradient(82deg, rgba(92, 13, 172, 1) 0%, rgba(46, 0, 115, 1) 47%, rgba(0, 18, 255, 0) 95%);
    overflow-x: scroll;
    padding: 2vh;
}

.popularesCartaz::-webkit-scrollbar {
    width: .5em;
    height: 0.6em;
}

.popularesCartaz::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.popularesCartaz::-webkit-scrollbar-thumb {
    background-color: rgb(88, 88, 88);
    outline: 2px solid rgb(15, 0, 0);
    border-radius: 0.2cm;
}

.Populares h1 {
    font-size: 45px;
}

.Populares h2 {
    font-size: 30px;
    padding: 1vh;
}
</style>