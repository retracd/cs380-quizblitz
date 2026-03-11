import { defineStore } from 'pinia'
import { questions as questionBank } from '../data/questions.js'

export const useGameStore = defineStore('game', {
  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    gameState: 'start',    // 'start' | 'playing' | 'end'
    selectedAnswer: null,
    timeLeft: 15,
    _timerInterval: null
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex],
    isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,
    progress: (state) => ({
      current: state.currentIndex + 1,
      total: state.questions.length
    })
  },
  
  actions: {
    // We will add actions in the next step
  }
})