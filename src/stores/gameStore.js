import { defineStore } from "pinia";
import { questions as questionBank } from "../data/questions.js";

export const useGameStore = defineStore("game", {
  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    gameState: "start", // 'start' | 'playing' | 'end'
    selectedAnswer: null,
    timeLeft: 15,
    _timerInterval: null,
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex],
    isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,
    progress: (state) => ({
      current: state.currentIndex + 1,
      total: state.questions.length,
    }),
  },

  actions: {
    _startTimer() {
      this._stopTimer();
      this._timerInterval = setInterval(() => {
        this.tick();
      }, 1000);
    },

    _stopTimer() {
      if (this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }
    },

    tick() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextQuestion(); // Time's up!
      }
    },

    startGame() {
      this.questions = [...questionBank]; // Use a fresh copy
      this.currentIndex = 0;
      this.score = 0;
      this.gameState = "playing";
      this.selectedAnswer = null;
      this.timeLeft = 15;
      this._startTimer();
    },

    submitAnswer(answerIndex) {
      if (this.selectedAnswer !== null) return;
      this._stopTimer();
      this.selectedAnswer = answerIndex;

      if (answerIndex === this.currentQuestion.correct) {
        this.score++;
      }

      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    },

    nextQuestion() {
      this.selectedAnswer = null;
      this.timeLeft = 15;
      if (this.isLastQuestion) {
        this._stopTimer();
        this.gameState = "end";
      } else {
        this.currentIndex++;
        this._startTimer();
      }
    },

    resetGame() {
      this._stopTimer();
      this.questions = [];
      this.currentIndex = 0;
      this.score = 0;
      this.gameState = "start";
      this.selectedAnswer = null;
      this.timeLeft = 15;
    },
  },
});
