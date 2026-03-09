<template>
  <div class="score-board">
    <h2>Game Over</h2>
    <p>Your Score: {{ score }} / 10</p>
    <button @click="$emit('restart')">Play Again</button>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  emits: ['restart']
}
</script>

<style scoped>
.score-board {
  padding: 2rem;
}
</style>