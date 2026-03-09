<template>
  <div class="question-card">
    <h3>{{ question.question }}</h3>
    
    <div class="answers">
      <button 
        v-for="(answer, index) in question.answers" 
        :key="index"
        :disabled="hasAnswered"
        :class="getButtonClass(index)"
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
    }
  },
  data() {
    return {
      hasAnswered: false,
      selectedIndex: null
    }
  },
  methods: {
    selectAnswer(index) {
      this.hasAnswered = true;
      this.selectedIndex = index;

      const isCorrect = index === this.question.correct;

      // Wait 1 second before notifying the parent
      setTimeout(() => {
        this.$emit('answer', isCorrect);
        
        // Reset state for the next question
        this.hasAnswered = false;
        this.selectedIndex = null;
      }, 1000);
    },
    getButtonClass(index) {
      if (!this.hasAnswered) return '';
      
      // Highlight correct answer green
      if (index === this.question.correct) return 'correct';
      
      // Highlight selected wrong answer red
      if (index === this.selectedIndex && index !== this.question.correct) {
        return 'wrong';
      }
      
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