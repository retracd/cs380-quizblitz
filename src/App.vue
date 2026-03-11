<template>
  <div id="app">
    <nav>
      <div class="nav-container">
        <RouterLink to="/" class="logo">QuizBlitz</RouterLink>
        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        </div>
      </div>
    </nav>
    
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
  --bg-dark: #0f0c29;
  --card-bg: #1b1b2f;
  --accent: #f5c518; 
  --text: #ffffff;
  --text-muted: #94a3b8;
}

body {
  margin: 0;
  background: radial-gradient(circle at top, #1b1b2f 0%, #0f0c29 100%);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.counter {
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  color: var(--accent);
  font-size: 0.9rem;
  margin-top: 2rem;
}

/* Modernized Button Base */
button {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--accent);
  color: #000 !important;
  border: 2px solid #000 !important;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0px #000;
}

button:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000;
}

button:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px #000;
}

nav {
  background: #0c0920;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.nav-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-color) !important;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

nav a {
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover {
  color: var(--accent-color);
}

/* Instructor requirement: active class styling */
nav a.router-link-active {
  color: var(--accent-color);
  border-bottom: 2px solid var(--accent-color);
}

*, *::before, *::after {
  box-sizing: border-box; /* Overflow fix */
}
</style>