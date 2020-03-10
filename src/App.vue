<template>
  <div id="app">
    <sidebar></sidebar>
    <navbar></navbar>
    <div class="app__navbarFiller">
      <div class="app__navbarFiller__in"></div>
    </div>
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
  },
  created () {
    const graphqlQuery = {
      query: `
      query {
        getUser {
          _id
          email
          name
        }
      }
      `
    }
    this.$http.post('http://localhost:8000/graphql', graphqlQuery)
      .then(response => {
        console.log(response)
      }, err => {
        console.log(err)
      })
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
  grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
  grid-template-rows: 9rem max-content;
  background: $color-grey--light;
  max-width: 100vw;
  .app__view {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    background: $color-grey--light;
    min-height: calc(100vh - 9rem);
    max-width: 120rem;
    padding-top: 2rem;
  }
  .app__title {
    &--md {
      font-size: $font-xl;
    }
  }
  .app__navbarFiller {
    grid-row: 1 / 2;
    grid-column: 2 / 4;
    background: $color-primary;
    position: relative;
    z-index: 2;
     &__in {
       background: $color-grey--light;
       height: 100%;
       width: 100%;
       position: absolute;
       z-index: 1;
        border-top-left-radius: 4rem;
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
