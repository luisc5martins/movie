<script setup>
import { ref, onMounted } from 'vue'
import api from './plugins/axios'

const moviesGenres = ref([])
const TVGenres = ref([])

onMounted(async () => {
  let response = await api.get('genre/movie/list?language=pt-BR')
  moviesGenres.value = response.data.genres
  response = await api.get('genre/tv/list?language=pt-BR')
  TVGenres.value = response.data.genres
})

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}


</script>

<template>
  <header>
    <nav>
      <div id="mySidenav" class="sidenav">
        <a href="HomeView.vue" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="TvView.vue">About</a>
      </div>

      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>

      <div style="margin-left:25%">
      </div>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>

header {
  height: 3rem;
  display: flex;
  background-color: black;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #fff;
}

</style>