import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue')
  },
  {
    path: '/series',
    name: 'Series',
    component: () => import('../views/TvView.vue')
  },
  {
    path: '/info',
    name: 'Informacoes',
    component: () => import('../views/informacoes.vue')
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetailsView.vue'),
    props: true,
  },
  {
    path: '/TV/:TVId',
    name: 'TVDetails',
    component: () => import('../views/TvDetailsView.vue'),
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router