<template>
  <div class="play-view">
    <QuestionCard
      v-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      @answer="handleAnswer"
    />
    <ScoreBoard
      v-else-if="gameState === 'end'"
      :score="score"
      @restart="returnHome"
    />
    <p v-if="gameState === 'playing'" class="counter">
      Question {{ currentIndex + 1 }} of {{ questions.length }}
    </p>
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },
  data() {
    return {
      questions: [
        { question: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets"], correct: 0 },
        // ... (Include your full list of 10 questions here)
      ],
      currentIndex: 0,
      score: 0,
      gameState: 'playing'
    }
  },
  mounted() {
    this.startGame();
  },
  methods: {
    startGame() {
      this.currentIndex = 0;
      this.score = 0;
      this.gameState = 'playing';
    },
    handleAnswer(isCorrect) {
      if (isCorrect) this.score++;
      this.currentIndex++;
      
      if (this.currentIndex >= this.questions.length) {
        this.gameState = 'end';
      }
    },
    returnHome() {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>