# Quiz 2 Answers
**Name:** Brent Josef Mayes II \
**Date:** 30 March 2026

## Q1

D

## Q2

In the `state` block of the store, I would add `lastAnswerCorrect: null`. The `submitAnswer` action should be updated as follows:

```js
submitAnswer(index) {
  const isCorrect = index === this.questions[this.currentIndex].correct;
  this.lastAnswerCorrect = isCorrect;
  if (isCorrect) {
    this.score++;
  }
  this.nextQuestion();
}
```

`QuestionCard` should read `lastAnswerCorrect` directly from the store to avoid prop drilling. If `App.vue` had to pass this data down, it would act as a middleman for state it doesn't actually use, creating unnecessary complexity and tighter coupling between components. By connecting directly to the store, the component becomes more independent and easier to reuse or move within the component tree.

## Q3

C

## Q4

In Part A, the mistake is that the student has used a manual `v-if` to render `GameView` but hasn't included the `<router-view />` component. Because the router is configured to map `/play` to `GameView`, it updates the URL, but without the `<router-view />` outlet, there is no place in the DOM for the matched component to be injected.

In Part B, the corrected template is:

```html
<template>
  <div>
    <h1>QuizBlitz</h1>
    <router-view />
  </div>
</template>
```

The `<router-view />` component is a functional outlet that tells Vue Router exactly where to render the component that matches the current URL path.

## Q5

B

## Q6

The error occurs because when the final question is answered, `nextQuestion()` increments `currentIndex` to equal the length of the array. In JavaScript, accessing `questions[10]` in a 10-item array returns `undefined`, and attempting to read the `.text` property of `undefined` throws a TypeError.

I would fix this in the `nextQuestion()` action:

```js
nextQuestion() {
  if (this.currentIndex < this.questions.length - 1) {
    this.currentIndex++;
  } else {
    this.gameState = 'end';
  }
}
```

I chose to fix this in the action because it is the "source of truth" for state transitions. Preventing the `currentIndex` from ever reaching an invalid state is more robust than adding "safety guards" to every getter or component that reads from that index.

## Q7

B

## Q8

**Local file approach**
- Advantage: Fast, zero-latency loading and works entirely offline without external dependencies.
- Disadvantage: Hard to scale or update; adding new questions requires a full rebuild and redeploy of the front-end code.

**Remote API approach**
- Advantage: Allows for dynamic updates to the question bank via a database without needing to touch the front-end code.
- Disadvantage: Introduces network latency and a "single point of failure"—if the API is down, the game cannot start.

**My choice and reasoning:**
For the current stage, I would stick with the local file approach. Keeping the logic synchronous makes it easier to focus on perfecting the store's `startGame` and `tick` actions without having to manage complex asynchronous error states or loading spinners.

## Q9

B

## Q10

**`useGameStore.js` changes:**
I would add `timeLeft: 15` and `_timerInterval: null` to the state. Then, I would add these actions:

```js
tick() {
  if (this.timeLeft > 0) {
    this.timeLeft--;
  } else {
    this.nextQuestion();
  }
},
_startTimer() {
  clearInterval(this._timerInterval);
  this.timeLeft = 15;
  this._timerInterval = setInterval(() => this.tick(), 1000);
}
```

I would also update `startGame` and `nextQuestion` to call `this._startTimer()`, and ensure `submitAnswer` calls `clearInterval(this._timerInterval)`.

**`QuestionCard.vue` changes (template only):**

```html
<div class="timer">Time Remaining: {{ store.timeLeft }}s</div>
```

**Why the timer logic belongs in the store, not the component:**
The timer is a piece of global game state that multiple components (like a timer bar in `App.vue` or a warning in `QuestionCard`) might need to access. Moving it to Pinia prevents "orphaned" intervals that might keep running if a component is unmounted, and ensures the timer is perfectly synced with the `gameState` and logic like `nextQuestion()`.