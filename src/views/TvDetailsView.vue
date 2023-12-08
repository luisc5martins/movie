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
      <img
        :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTV.poster_path}`"
        :alt="tvStore.currentTV.title"
      />

      <div class="details">
        <h1>Série: {{ tvStore.currentTV.name }}</h1>
        <p>{{ tvStore.currentTV.tagline }}</p>
        <p>{{ tvStore.currentTV.overview }}</p>
        <p>Orçamento: ${{ tvStore.currentTV.budget }}</p>
        <p>Avaliação: {{ tvStore.currentTV.vote_average }}</p>
      </div>
    </div>
  </div>

  <p>Produtoras</p>
  <div class="companies">
    <template
      v-for="company in tvStore.currentTV.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
  
</template>
