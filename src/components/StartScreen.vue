<template>
  <div class="start-screen">
    <h1>QuizBlitz</h1>
    <p>Test your tech knowledge in this fast-paced trivia game!</p>
    <button @click="emitStart">Play</button>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  emits: ['start'],
  methods: {
    emitStart() {
      this.$emit('start');
    }
  }
}
</script>

<style scoped>
.start-screen {
  padding: 2rem;
}
button {
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>