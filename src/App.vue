<script setup>
import { ref, onMounted } from 'vue'
import api from './plugins/axios'
import footer from '../components/footer.vue';

const moviesGenres = ref([])
const TVGenres = ref([])

onMounted(async () => {
  let response = await api.get('genre/movie/list?language=pt-BR')
  moviesGenres.value = response.data.genres
  response = await api.get('genre/tv/list?language=pt-BR')
  TVGenres.value = response.data.genres
})

</script>

<template>
  <header>
    <nav>

      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/"><img src="/public/Movie_Hoster.ico" alt="" height="90"></router-link>
      <router-link to="/series">Séries</router-link>

      <div>
      </div>
    </nav>
  </header>
  <main>
    <router-view />
    <footer />
  </main>
</template>

<style scoped>



</style>