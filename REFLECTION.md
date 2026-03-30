# Reflection — Quiz 2 Part 1
**Name:** Brent Josef Mayes II \
**Date:** 30 March 2026

## Q1 — Props

A prop is a custom attribute used to pass data from a parent component down to a child component. In this project, data flows in a single direction from the store to the parent and then into `QuestionCard.vue` via props. We prefer passing data this way rather than importing `useGameStore` directly into the child because it keeps `QuestionCard` as a "presentational" or "dumb" component. This decoupling makes the component much easier to test and reuse in other parts of the app since it only cares about the data it is given, not where that data originated.

## Q2 — $emit

The `$emit` function allows a child component to send a custom event notification up to its parent. The parent listens for this event using the `v-on` directive (or the `@` shorthand) placed directly on the child component tag in the template. If a developer forgot to handle the emitted event in the parent, the event would effectively disappear into a void; the child would signal that an action occurred, but the parent would never trigger the corresponding logic, such as calling `submitAnswer`, and the game would fail to progress.

## Q3 — Pinia store

When state like `currentIndex`, `score`, and `gameState` is managed in `App.vue`, it leads to a problem called prop drilling as the component tree grows. This requires passing data through multiple layers of intermediate components that do not actually need the information just to reach a deeply nested child. Moving state into a Pinia store solves this by allowing any component to "own" or access the global state directly. This centralizes the logic in `useGameStore`, ensuring that state changes are predictable and that components only need to subscribe to the specific pieces of data they require.

## Q4 — Vue Router

A traditional multi-page website requests a brand-new HTML document from the server every time a link is clicked, causing a full page reload. In contrast, a Single-Page Application (SPA) loads the initial code once and then dynamically swaps out components based on the URL. The `<router-view>` component acts as a dynamic placeholder or "outlet" that renders the specific component matched to the current route. Navigating between routes does not reload the page because Vue Router intercepts the link click and updates the browser's history programmatically without making a new request to the server.

## Q5 — v-if vs v-show

The primary difference between `v-if` and `v-show` is how they handle the DOM. `v-if` is a "real" conditional renderer that completely destroys and recreates components and their event listeners when the condition toggles. `v-show` is much simpler, as it keeps the element in the DOM and merely toggles its visibility using the CSS `display: none` property. `v-if` is the better choice for switching game screens because it ensures that only the relevant screen's logic is active at one time, preventing background components from accidentally processing inputs or interfering with the current game state.