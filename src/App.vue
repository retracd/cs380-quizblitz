<template>
  <div id="app">
    <StartScreen 
      v-if="gameState === 'start'" 
      @start="startGame" 
    />
    
    <div v-else-if="gameState === 'playing'">
      <QuestionCard
        :question="questions[currentIndex]"
        @answer="handleAnswer"
      />
      <p class="counter">Question {{ currentIndex + 1 }} of {{ questions.length }}</p>
    </div>

    <ScoreBoard
      v-else
      :score="score"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue'
import QuestionCard from './components/QuestionCard.vue'
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'App',
  components: {
    StartScreen,
    QuestionCard,
    ScoreBoard
  },
  data() {
    return {
      // The 10 questions generated in Milestone 1.5
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
      gameState: "start" // "start" | "playing" | "end"
    }
  },
  methods: {
    startGame() {
      this.gameState = "playing";
      this.currentIndex = 0;
      this.score = 0;
    },
    handleAnswer(isCorrect) {
      if (isCorrect) {
        this.score++;
      }
      
      this.currentIndex++;
      
      // Check if we reached the end of the quiz
      if (this.currentIndex >= this.questions.length) {
        this.gameState = "end";
      }
    },
    resetGame() {
      this.gameState = "start";
    }
  }
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.counter {
  margin-top: 20px;
  color: #7f8c8d;
  font-weight: bold;
}
</style>