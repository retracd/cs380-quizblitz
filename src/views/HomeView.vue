<template>
  <div class="home hero-container">
    <!-- <div class="logo-badge">Ready?</div> -->
    <StartScreen @start="startGame" />
    <div class="stats-preview">
      <span>10 Questions</span> • <span>Class: IFSA Prague</span>
    </div>
  </div>
</template>

<script>
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',
  components: { StartScreen },
  methods: {
    startGame() {
      sessionStorage.setItem('gameStarted', 'true');
      this.$router.push({ name: 'play' });
    }
  }
}
</script>

<style scoped>
.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
}

/* Force the StartScreen H1 to use Orbitron */
:deep(h1) {
  font-family: 'Orbitron', sans-serif !important;
  font-size: 3.5rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.logo-badge {
  background: #000;
  color: var(--accent);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-family: 'Orbitron', sans-serif;
  border: 1px solid var(--accent);
  margin-bottom: 10px;
}

.stats-preview {
  margin-top: 2rem;
  color: var(--text-muted);
  font-size: 0.8rem;
  letter-spacing: 1px;
}
</style>