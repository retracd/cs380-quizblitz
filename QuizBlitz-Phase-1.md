# QuizBlitz — Phase 1
## Week 6 Class 1: Vue Components & Props

**What you will build today:** A fully playable quiz game running in the browser, built with Vite + Vue 3, using hardcoded questions and four components.

**By the end of this class you must have:**
- A GitHub repository with at least 4 commits following the milestone order below
- A game that plays through 10 questions and shows a final score
- An `ai-log.txt` file documenting every AI prompt you used

---

## Before You Start — The Rules

**Every commit must contain working code.** Never commit broken code. Get one milestone working, test it, then commit.

**Log every AI prompt** in `ai-log.txt` before committing. Format:

```
PROMPT: (exactly what you asked)
RESPONSE: (paste the code or summary you received)
WHAT I USED / CHANGED: (1–3 lines)
```

If you did not use AI for a step, write `No AI used.`

**Read AI output before pasting it.**

---

## The Question Shape

Every question in this game is an object with this exact structure:

```js
{
  question: "What does CSS stand for?",
  answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets"],
  correct: 0
}
```

`correct` is the index of the right answer in the `answers` array. `0` means the first answer is correct.

Ask Claude to generate a random Q and A list, formatted as the above structure.

---

## The Component Tree

```
App.vue
├── StartScreen.vue      (shown when gameState === "start")
├── QuestionCard.vue     (shown when gameState === "playing")
└── ScoreBoard.vue       (shown when gameState === "end")
```

`App.vue` owns all state. The other components receive data as props and communicate upward using `$emit`.

---

## Milestone 1 — Project Setup
### Target: ~20 minutes | Commit message: `Project setup`

Open Terminal and run the following commands one at a time:

```bash
npm create vite@latest quizblitz -- --template vue
```

Open `http://localhost:5173` in your browser. You should see the default Vite welcome screen. If you do, the scaffold is working.

**Tidy up the boilerplate:**

Delete `src/components/HelloWorld.vue`. Open `src/App.vue` and replace its entire contents with:

```vue
<template>
  <div id="app">
    <h1>QuizBlitz</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

The page should now show only "QuizBlitz". If it does, you are ready to commit.

**Create your GitHub repository, then push:**

```bash
git init
git add .
git commit -m "Project setup"
git remote add origin https://github.com/YOUR-USERNAME/quizblitz.git
git push -u origin main
```

Also create `ai-log.txt` in the root of your project now, even if it only contains `No AI used.` at this stage.

---

## Milestone 2 — StartScreen and ScoreBoard
### Target: ~20 minutes | Commit message: `Add StartScreen and ScoreBoard components`

Create two new files inside `src/components/`.

**`src/components/StartScreen.vue`**

This component has no props. It displays a welcome message and a Play button. When Play is clicked, it emits `"start"` to its parent.

Suggested vibe-coding prompt:

> "Write a Vue 3 single-file component called StartScreen. It should display a heading that says 'QuizBlitz', a short tagline, and a button labelled 'Play'. When the button is clicked, it emits an event called 'start'. Use the Options API (not Composition API). No props needed."

Read the output. Does it use `$emit`? Does the button have a `@click` handler? If yes, integrate it.

**`src/components/ScoreBoard.vue`**

This component receives one prop: `score` (a Number). It displays the final score and a Play Again button. When Play Again is clicked, it emits `"restart"`.

Suggested vibe-coding prompt:

> "Write a Vue 3 single-file component called ScoreBoard. It receives a prop called `score` (Number). It displays a heading 'Game Over', the player's score out of 10, and a 'Play Again' button. When Play Again is clicked, it emits 'restart'. Use the Options API."

**Wire both into App.vue temporarily to check they render:**

```vue
<template>
  <div id="app">
    <StartScreen @start="() => {}" />
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue'
export default {
  components: { StartScreen }
}
</script>
```

Check that the component renders in the browser. Then remove the temporary import and commit.

---

## Milestone 3 — QuestionCard
### Target: ~25 minutes | Commit message: `Add QuestionCard component`

This is the most important component. It receives a single prop called `question` (the object shape described above). It renders the question text and four answer buttons. When a button is clicked, it highlights the correct answer green and the wrong answer red for 1 second, then emits `"answer"` with `true` (correct) or `false` (wrong).

**Use this vibe-coding prompt — copy it exactly:**

> "I'm building a Vue 3 quiz game using Vite and the Options API. Write a single-file component called QuestionCard. It receives one prop called `question` shaped like `{ question: String, answers: Array, correct: Number }`. The template should display the question text and render four answer buttons using v-for. When a button is clicked: disable all buttons immediately, apply a green CSS class to the correct answer button and a red class to the clicked button if it was wrong, wait 1 second using setTimeout, then emit an event called 'answer' with the value true if the answer was correct or false if it was wrong. Reset the highlight state after emitting. Do not use TypeScript."

Read the output carefully before pasting. Check for these things:

- Is there a `v-for` on the buttons with a `:key`?
- Is there a `data()` property managing which button is selected and which is correct?
- Is `setTimeout` used with a 1-second delay?
- Does it `$emit('answer', true/false)`?

If anything is missing or confusing, paste the issue back to Claude and ask for a fix. Log both the original prompt and any follow-up prompts.

Test it by temporarily importing it in `App.vue` and passing a hardcoded question object as a prop.

---

## Milestone 4 — App.vue Game Logic
### Target: ~20 minutes | Commit message: `Wire game logic in App.vue`

Now you connect everything. Replace the contents of `src/App.vue` with the full game logic.

**State your app needs in `data()`:**

```js
data() {
  return {
    questions: [], // you will fill this with your 10 questions
    currentIndex: 0,
    score: 0,
    gameState: "start" // "start" | "playing" | "end"
  }
}
```

**Paste your 10 questions into the `questions` array.**

**Methods your app needs:**

`startGame()` — sets `gameState` to `"playing"` and resets `currentIndex` and `score` to 0.

`handleAnswer(isCorrect)` — increments `score` if `isCorrect` is true, then increments `currentIndex`. If `currentIndex` equals `questions.length`, set `gameState` to `"end"`.

`resetGame()` — sets `gameState` back to `"start"`.

**Template logic:**

```vue
<template>
  <div id="app">
    <StartScreen v-if="gameState === 'start'" @start="startGame" />
    <QuestionCard
      v-else-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      @answer="handleAnswer"
    />
    <ScoreBoard
      v-else
      :score="score"
      @restart="resetGame"
    />
  </div>
</template>
```

**Test the full flow:** Click Play → answer all 10 questions → see your score → click Play Again → confirm it resets.

Commit when the full flow works.

---

## Stretch Goal (if you finish early)

Add a question counter below the `QuestionCard` that shows "Question 3 of 10". This should be a computed property or a simple expression in the template. Commit it as `Add question counter`.

---

## End of Class Checklist

Before you leave, confirm all of the following:

- [ ] `npm run dev` starts without errors
- [ ] The game plays through all 10 questions
- [ ] The final score screen appears and Play Again works
- [ ] You have at least 4 commits with the milestone messages above
- [ ] `ai-log.txt` is present and documents every prompt you used
- [ ] Everything is pushed to GitHub (`git status` shows nothing to commit)

---

## What Comes Next

**Wednesday (Class 2):** You add Vue Router so the game has proper URL-based screens. The code you wrote today stays; you extend it.

**Week 7:** All the game state moves into a Pinia store and a 15-second countdown timer is added per question.

**Keep this repo — you will submit it as your front-end assignment at the end of Week 7.**