<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import genreStore from '@/stores/genre.js';


const router = useRouter()
const maxLength = 200;
const mensagemNada = ref('Mais informações em breve...');

const isLoading = ref(false);
const movies = ref([]);
const TV = ref([]);
const genres = ref([]);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const props = defineProps(['movies', 'titulo', 'subtitulo']);

const listMovies = async (genreId) => {
  isLoading.value = true;
  let response = await api.get('movie/popular', {
    params: {
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results

  response = await api.get('tv/popular', {
    params: {
      language: 'pt-BR'
    }
  });
  TV.value = response.data.results

  isLoading.value = false;
};

const getShortText = overview => {
  if (overview.length > maxLength) {
    return `${overview.substring(0, maxLength)}...`;
  } else if (overview.length === 0) {
    return mensagemNada.value;
  } else {
    return overview;
  }
};

function openTV(TVId) {
  router.push({ name: 'TVDetails', params: { TVId } });
}

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  await listMovies()
  isLoading.value = false
})
</script>

<template>
  <h1>Home</h1>

  <div class="Populares">
      <h1>Filmes populares</h1>
        <div class="popularesCartaz">
            <div v-for="movie in movies" :key="movie.id" class="cartazDeMovie">
                <img class="poster-filme" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="openMovie(movie.id)" />
                <div class="content">
                    <h3 class="prompt-title" @click="openMovie(movie.id)">{{ movie.title }}</h3>
                    <div class="info">
                        <p class="prompt-info" @click="openMovie(movie.id)">{{ getShortText(movie.overview) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <div class="Populares">
    <h1>Series Populares</h1>
    <div class="popularesCartaz">
      <div v-for="TV in TV" :key="TV.id" class="cartazDeSerie">
        <img class="poster-serie" :src="`https://image.tmdb.org/t/p/w500${TV.poster_path}`" :alt="TV.title" @click="openTV(TV.id)" />
        <div class="content">
          <h3 class="prompt-title"  @click="openTV(TV.id)">{{ TV.name }}</h3>
          <div class="info">
            <p class="prompt-info"  @click="openTV(TV.id)">{{ getShortText(TV.overview) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h3>Diversos:</h3>

  <h1>Filmes</h1>

  <loading v-model:active="isLoading" is-full-page />

  <div class="movie-list">
    <div tabindex="0" v-for="movie in movies" :key="movie.id" @keypress.enter="openMovie(movie.id)" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="openMovie(movie.id)" />
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

  <h1>Séries</h1>

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
.prompt-title {
  color: white;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: black;
}

.prompt-info {
  color: white;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: black;
}

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
  bottom: 90%;
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

.poster-serie {
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

.cartazDeSerie:hover .content {
  display: block;
}

.cartazDeSerie:hover .poster-serie {
  opacity: 0.3;
}

.popularesCartaz {
  display: flex;
  flex-direction: row;
  height: 27rem;
  background: #a80909;
  overflow-x: scroll;
  padding: 2vh;
  border-radius: 10px;
}

.popularesCartaz::-webkit-scrollbar {
  width: .5em;
  height: 0.6em;
}

.popularesCartaz::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.popularesCartaz::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  outline: 1px solid rgb(88, 88, 88);
  border-radius: 1cm;
}

.Populares h1 {
  font-size: 45px;
}

.Populares h2 {
  font-size: 30px;
  padding: 1vh;
}

h3 {
  text-align: center;
  color: white;
}

</style>