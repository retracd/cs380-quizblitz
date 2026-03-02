# QuizBlitz — Project Overview
## Web Applications Development — IFSA Prague

> A phased trivia game project that runs from **Week 6 through Week 11** and
> evolves naturally into the **Capstone Project** in Weeks 12–15.

---

## The Concept

**QuizBlitz** is a browser-based trivia quiz game. Players answer multiple-choice questions against a countdown timer, earn points for correct answers, and compete on a leaderboard. The game is simple enough to build in stages with limited skills, but rich enough to grow into a full-stack capstone application.

The project is built using **vibe-coding** — you describe what they want to Claude AI, review the output, integrate it, and commit. Each phase has a clear goal is to always know what to ask for.

---

## Why This Game Works

**For students:** The rules are immediately obvious, the UI is naturally component-based, the back-end need is obvious (you need questions from somewhere), and there are endless ways to make it more interesting — making the capstone extension feel exciting rather than forced.

**For the curriculum:** Each phase lands exactly when students are learning the relevant skill. The game does not require any novel UI tricks, custom graphics, or complex state that beginners would find overwhelming.

**For vibe-coding:** The prompts are easy to write. "Add a timer that counts down from 15 seconds" is a perfect Claude prompt. Students can describe the game in plain language and get working code back.

---

## Phase Overview

| Phase | Week | Skill Focus | What Gets Built |
|-------|------|-------------|-----------------|
| 1 | 6 | Vue Components & Props | Game UI as components, hardcoded questions |
| 2 | 7 | Pinia State Management | All game state moves into a store |
| 3 | 9 | Express.js & REST API | Questions served from an API, scores submitted |
| 4 | 10 | MongoDB & JWT | Questions in a database, user accounts, leaderboard |
| 5 | 11 | Deployment | Live game on GitHub Pages + Railway |
| Capstone | 12–15 | Everything | Student-chosen extensions (see below) |

---

## Phase 1 — Vue Components (Week 6)

### Goal
Build a working, self-contained quiz game using only hardcoded data and Vue components. No back-end. No database. Just a game that runs in the browser.

### What we build

**Components to create:**

- `App.vue` — root component, manages which screen is shown
- `StartScreen.vue` — welcome screen with a "Play" button
- `QuestionCard.vue` — displays the current question and four answer buttons, receives the question as a prop
- `ScoreBoard.vue` — displays the final score with a "Play Again" button

**Game logic (in `App.vue` or a simple composable):**

- Array of 10 hardcoded question objects:
  ```js
  { question: "What does CSS stand for?", answers: ["...", "...", "...", "..."], correct: 0 }
  ```
- Track `currentIndex`, `score`, and `gameState` (`"start"` / `"playing"` / `"end"`)
- Move to next question on answer, increment score if correct
- Show `StartScreen`, `QuestionCard`, or `ScoreBoard` based on `gameState`

### Milestones
- The game starts, runs through all 10 questions, shows the final score
- Typing a prop into `QuestionCard` correctly re-renders the question
- Committing works incrementally (at least 4 commits for this phase)

### Suggested vibe-coding prompt
> "I'm building a Vue 3 quiz game using Vite. I have a QuestionCard component
> that receives a `question` prop shaped like `{ question: String, answers: Array,
> correct: Number }`. Write the template and script so it displays the question,
> renders four answer buttons, emits an `answer` event with `true` or `false`
> depending on whether the selected answer is correct, and highlights the correct
> answer green and the wrong answer red for 1 second before emitting."

---

## Phase 2 — Pinia State Management (Week 7)

### Goal
Pull all game state out of `App.vue` and into a Pinia store. The components should become thinner; the store should own the game's logic.

### What we build

**`useGameStore.js`:**

```js
state: {
  questions: [],        // loaded from a questions file for now
  currentIndex: 0,
  score: 0,
  gameState: "start",   // "start" | "playing" | "end"
  selectedAnswer: null,
  timeLeft: 15
}

actions:
  startGame()
  submitAnswer(index)
  nextQuestion()
  resetGame()
  tick()                // called by a setInterval every second
```

**Timer:** Add a 15-second countdown per question. If time runs out, move to the next question automatically with no points awarded. The timer resets on each new question.

**Streak bonus (optional stretch goal):** Add a `streak` state value. Award +1 bonus point for every 3 correct answers in a row. This gives you a reason to think about derived state in the store.

### Milestones
- All game logic lives in the store — `App.vue` only calls store actions
- The timer counts down visibly and advances the question on zero
- DevTools (Vue DevTools extension) shows the store state updating in real time

### Suggested vibe-coding prompt
> "I have a Pinia store for a quiz game. Add a countdown timer that starts at 15
> seconds when a new question begins. Every second, reduce `timeLeft` by 1. If
> `timeLeft` reaches 0, call `nextQuestion()`. Clear the interval when the game
> ends or the player answers before time runs out. The timer should restart on
> every new question."

---

## Phase 3 — Express.js Back-End (Week 9)

### Goal
Replace hardcoded questions with questions fetched from a REST API. Add a score submission endpoint so the game can record results server-side.

### What we build

**Express server (`server.js`):**

```
GET  /api/questions         → returns array of question objects
GET  /api/questions/random  → returns 10 shuffled questions
POST /api/scores            → accepts { playerName, score, totalQuestions }
GET  /api/scores            → returns all submitted scores sorted by score desc
```

Questions are stored in a plain JS array in the server file for now (database comes in Phase 4). Scores are stored in an in-memory array — they reset on server restart, which is fine for this phase and gives you a clear reason to add a database next week.

**Front-end changes:**

- Replace the hardcoded questions array with a `fetch` call to `GET /api/questions/random` inside `startGame()` in the Pinia store
- On game end, show a name input and a "Submit Score" button that posts to `POST /api/scores`

### Milestones
- Refreshing the page loads a fresh shuffled set of questions from the API
- Submitting a score logs it on the server (visible in the terminal with `console.log`)
- CORS is configured so the Vite dev server and Express server can talk to each other

### Suggested vibe-coding prompt
> "Write an Express.js route `GET /api/questions/random` that takes the full
> questions array, shuffles it using the Fisher-Yates algorithm, and returns a
> random selection of 10 questions. Each question object should have: `id`,
> `question`, `answers` (array of 4 strings), and `correct` (index of the correct
> answer)."

---

## Phase 4 — MongoDB & JWT (Week 10)

### Goal
Make the data permanent. Add user accounts so scores are tied to a player identity rather than a submitted name string.

### What we build

**MongoDB collections:**

- `questions` — the quiz question bank, seeded with at least 30 questions
- `scores` — each document: `{ userId, playerName, score, totalQuestions, date }`
- `users` — `{ email, passwordHash }`

**New API routes:**

```
POST /api/auth/register    → create account
POST /api/auth/login       → returns JWT
GET  /api/scores           → public leaderboard (top 10)
POST /api/scores           → protected, requires valid JWT, uses req.user for name
```

**Front-end changes:**

- Add a `LoginScreen.vue` and `RegisterScreen.vue`
- Store the JWT in `localStorage` (you should recognise this pattern from the sticky notes project)
- If the player is logged in, skip the name input on game end and submit score automatically using the token

### Milestones
- Registering an account and logging in works
- Submitting a score while logged in saves it to MongoDB and appears on the leaderboard
- The leaderboard persists after the server restarts

---

## Phase 5 — Deployment (Week 11)

### Goal
The game is live at a public URL. A stranger can open it, play, and appear on the leaderboard.

### Deployment targets

| Part | Platform |
|------|----------|
| Vue front-end | GitHub Pages or Netlify |
| Express back-end | Railway (free tier) |
| MongoDB | MongoDB Atlas (free tier, already used in class) |

**Checklist for this phase:**

- Environment variable for the API base URL (`VITE_API_URL`) so it works both in development and production
- CORS configured for the production front-end origin, not just `localhost`
- At least 30 questions seeded into the production database

### Milestones
- Playing the game on a phone using only the public URL
- Submitting a score and seeing it appear on the leaderboard from a different device

---

## Capstone Extensions (Weeks 12–15)

This is where the project becomes your own. The game is working and deployed — the capstone is about choosing which direction to take it. Pitch your chosen extension in Week 12 and build it through Week 14.

### Suggested extension tracks

**Track A — Social & Competitive**
- Friend challenges: generate a shareable link with a fixed question set, compare scores with friends who use the same link
- Live multiplayer using WebSockets (Socket.io): two players see the same question at the same time, first to answer correctly wins the round
- Weekly leaderboard that resets automatically

**Track B — Content & Customisation**
- Admin panel: a protected route where the game owner can add, edit, and delete questions from the database through a UI (no manual MongoDB access needed)
- Category selection: questions tagged by category (Science, History, Pop Culture, etc.), players choose one or more categories before starting
- Difficulty levels: Easy / Medium / Hard questions, with different point values

**Track C — Polish & UX**
- Animated transitions between questions using Vue's `<Transition>` component
- Sound effects and a visual pulse when the timer gets below 5 seconds
- Player profile page showing game history, best score, average score, and a streak graph using a charting library
- Accessibility audit and improvements: keyboard navigation, screen reader labels, sufficient colour contrast

**Track D — Technical Depth**
- Full TypeScript migration
- Unit tests for the Pinia store using Vitest
- CI/CD pipeline using GitHub Actions that runs tests and redeploys on push to main

You are not limited to one track. A student who builds a working admin panel (Track B) and adds animated transitions (Track C) has a stronger capstone than one who attempts multiplayer and does not finish it.

---

## Vibe-Coding Guidelines

Vibe-coding means using Claude AI to generate code by describing what you want in plain English, then reviewing, testing, and integrating it yourself. You are the architect. Claude is the fast typist.

**How to write a good prompt:**

1. State the context first: "I have a Vue 3 / Pinia / Express app for a quiz game."
2. Describe what already exists that the new code must connect to.
3. Describe exactly what you want the code to do — not how to do it.
4. Mention constraints: "Don't use TypeScript", "Keep it in a single component", "The function must be async."

**What to do after Claude responds:**

- Read it before pasting. Do you understand what it does?
- Test it in isolation if possible.
- If it does not work, paste the error back to Claude and ask it to fix it.
- Commit after each working addition. Do not accumulate large chunks of unreviewed code.

**Log everything in `ai-log.txt`.** This is required by the course rules and also useful for you — if something breaks, you can trace exactly what you asked for.

---

## Grading Alignment

The project does not have its own separate grade. Its value is threefold:

1. **Quizzes 2 and 3** — Students who have built the game understand the concepts being tested. Phase 1–2 covers Quiz 2 material directly. Phase 3–4 covers Quiz 3 material directly.

2. **Capstone grade (35%)** — The capstone is the extended version of this game. Students start Week 12 with a working deployed application rather than a blank repository. This gives them more time for the extension work that earns marks.

3. **Participation (5%)** — The game gives you something concrete to discuss, compare, and demo in class. Students who finish each phase have something to show; students who get stuck have a specific question to ask.
