<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --bg-color: #1a1a2e;
  --card-bg: #16213e;
  --text-color: #e0e0e0;
  --accent-color: #f5c518;
  --button-hover: #e0b415;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
}

.home,
.play-view,
.leaderboard {
  max-width: 800px;
  margin: 40px auto;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

h1,
h2,
h3 {
  color: var(--accent-color);
}

button {
  background-color: var(--accent-color);
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.1s, background-color 0.2s;
}

button:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>