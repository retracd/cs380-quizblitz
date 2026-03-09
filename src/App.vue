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
</style>