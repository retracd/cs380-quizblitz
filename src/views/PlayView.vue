<template>
  <div class="play-view">
    <div class="quiz-container">
      <div class="timer-bar">
        <div
          class="timer-fill"
          :style="{ width: timerPercent + '%' }"
          :class="{ urgent: store.timeLeft <= 5 }"
        ></div>
      </div>

      <p class="progress">
        Question {{ store.progress.current }} of {{ store.progress.total }}
      </p>

      <div class="game-stack">
        <QuestionCard
          v-if="store.gameState === 'playing' && store.currentQuestion"
          :question="store.currentQuestion"
          :selectedAnswer="store.selectedAnswer"
          @answer="store.submitAnswer"
        />

        <ScoreBoard
          v-else-if="store.gameState === 'end'"
          :score="store.score"
          :total="store.questions.length"
          @restart="handleRestart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },
  setup() {
    const store = useGameStore(); // available as this.store
    return { store };
  },
  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100;
    }
  },
  methods: {
    handleRestart() {
      this.store.resetGame();
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style scoped>
/* Timer Bar Styles */
.timer-bar {
  width: 100%;
  height: 12px;
  background: #000;
  border: 2px solid var(--accent);
  border-radius: 6px;
  margin-bottom: 2rem;
  overflow: hidden;
}
.timer-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.9s linear;
}
.timer-fill.urgent {
  background: #ff4444;
  box-shadow: 0 0 10px #ff4444;
}
.game-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.progress, .counter {
  padding: 0 20px;
}
</style>

<!-- <style scoped>
.play-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
}

.quiz-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.counter {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: var(--accent);
}
</style> -->