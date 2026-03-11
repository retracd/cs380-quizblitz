<template>
  <div class="question-card">
    <h3 class="question-text">{{ question.question }}</h3>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :class="buttonClass(index)"
        :disabled="selectedAnswer !== null"
        @click="selectAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    question: {
      type: Object,
      required: true
    },
    selectedAnswer: {
      type: Number,
      default: null
    }
  },
  methods: {
    selectAnswer(index) {
      if (this.selectedAnswer !== null) return;
      this.$emit('answer', index); // Emit index, not boolean
    },
    buttonClass(index) {
      if (this.selectedAnswer === null) return '';
      if (index === this.question.correct) return 'correct';
      if (index === this.selectedAnswer) return 'wrong';
      return '';
    }
  }
}
</script>

<style scoped>
.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

button {
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: background-color 0.2s;
}

button:disabled {
  cursor: not-allowed;
}

/* Logic-driven styles */
.correct {
  background-color: #44bb44 !important;
  color: white;
  border-color: #227722;
}

.wrong {
  background-color: #ff4444 !important;
  color: white;
  border-color: #881111;
}
</style>