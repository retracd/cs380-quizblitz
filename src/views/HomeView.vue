<template>
  <div class="home">
    <StartScreen @start="goToPlay" />
  </div>
</template>

<script>
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',
  components: { StartScreen },
  methods: {
    goToPlay() {
      // Use the router to navigate to the 'play' route
      this.$router.push({ name: 'play' });
    }
  }
}
</script>