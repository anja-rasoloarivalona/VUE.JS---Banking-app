<template>
  <div id="app">
    <sidebar></sidebar>
    <navbar></navbar>
    <div class="app__view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Sidebar,
    Navbar
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

#app {
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 9rem max-content;
  background: $color-primary;
  .app__view {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    background: $color-white;
    height: calc(100vh - 9rem);
    padding: 2rem;
  }
  .app__title {
    &--md {
      font-size: $font-xl;
    }
  }
}
.color-primary {
color: $color-primary
}
.color-grey-main {
color: $color-grey--main
}
</style>
