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

router.beforeEach((to) => {
  if (to.name === 'play') {
    const store = useGameStore()
    if (store.gameState !== 'playing') {
      return { name: 'home' } // Block direct access
    }
  }
})

export default router