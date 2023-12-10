<script setup>
import { defineProps, onMounted } from 'vue';
import { useTVStore } from '@/stores/TV';
const tvStore = useTVStore();

const props = defineProps({
  TVId: {
    type: Number,
    required: true,
  }

});

onMounted(async () => {
  await tvStore.getTVDetail(props.TVId);
});
</script>

<template>
  <div class="main">
    <div class="content">
      <div class="fundo">
      <img :src="`https://image.tmdb.org/t/p/w300${tvStore.currentTV.poster_path}`" :alt="tvStore.currentTV.title" />
      </div>
      <div class="details">
        <h1>Série: {{ tvStore.currentTV.name }}</h1>
        <p>{{ tvStore.currentTV.tagline }}</p>
          <div class="sobreTV">
            <p>{{ tvStore.currentTV.overview }}</p>
          </div>
        <p>Primeira Exibição: {{ tvStore.currentTV.first_air_date }}</p>
        <p>Avaliação: {{ tvStore.currentTV.vote_average }}</p>
      </div>
    </div>
  </div>

  <div class="prod">
  <div>
    <h1>Produtoras:</h1>
  </div>
  <div class="companies">
    <template v-for="company in tvStore.currentTV.production_companies" :key="company.id">
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
  background-size: 1600px;
}

h1{
  margin-top: 40px;
}</style>