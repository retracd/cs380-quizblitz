import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/play', name: 'play', component: PlayView },
  { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  // If the user tries to go to 'play' without the 'gameStarted' flag, send them 'home'
  if (to.name === 'play' && sessionStorage.getItem('gameStarted') !== 'true') {
    return { name: 'home' }
  }
})

export default router