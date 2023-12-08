import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useTVStore = defineStore('tv', () => {
  const state = reactive({
    currentTV: {},
  });

  const currentTV = computed(() => state.currentTV);

  const getTVDetail = async (TVId) => {
    const response = await api.get(`tv/${TVId}`);
    state.currentTV = response.data;
  };

  return { currentTV, getTVDetail };
});