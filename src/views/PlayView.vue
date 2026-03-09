<template>
  <div class="play-view">
    <div class="quiz-container">
      <div class="game-stack">
        <QuestionCard
          v-if="gameState === 'playing'"
          :question="questions[currentIndex]"
          @answer="handleAnswer"
        />
        
        <p v-if="gameState === 'playing'" class="counter">
          — Question {{ currentIndex + 1 }} of {{ questions.length }} —
        </p>
      </div>

      <!-- <ScoreBoard
        v-else-if="gameState === 'end'"
        :score="score"
        @restart="returnHome"
      /> -->
    </div>
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
        { question: "Which language is primarily used for client-side scripting?", answers: ["Python", "Java", "JavaScript", "C++"], correct: 2 },
        { question: "What does the 'V' in Vite stand for in French?", answers: ["Very", "Quick", "Victory", "View"], correct: 1 },
        { question: "Which HTML tag is used to define an internal style sheet?", answers: ["<css>", "<script>", "<style>", "<design>"], correct: 2 },
        { question: "Who created the Vue.js framework?", answers: ["Evan You", "Mark Zuckerberg", "Brendan Eich", "Linus Torvalds"], correct: 0 },
        { question: "What is the default port for a Vite development server?", answers: ["3000", "8080", "5173", "5000"], correct: 2 },
        { question: "In CSS, which property is used to change background color?", answers: ["color", "bgcolor", "background-color", "canvas-color"], correct: 2 },
        { question: "Which of these is NOT a Vue.js lifecycle hook?", answers: ["mounted", "created", "rendered", "updated"], correct: 2 },
        { question: "What does 'API' stand for?", answers: ["Applied Process Integration", "Application Programming Interface", "Automated Program Index", "Advanced Peripheral Interaction"], correct: 1 },
        { question: "Which command is used to initialize a new Git repository?", answers: ["git start", "git new", "git init", "git create"], correct: 2 }
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

<style scoped>
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
</style>