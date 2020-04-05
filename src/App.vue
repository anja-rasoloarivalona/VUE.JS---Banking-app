<template>
  <div id="app">
    <router-view name="starter" v-if="!isAppReady"/>
    <div v-else-if="!loading" class="app-main">
      <sidebar></sidebar>
      <navbar></navbar>
      <settings></settings>
      <div class="app__view">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import Sidebar from './components/Layout/Sidebar'
import Navbar from './components/Layout/Navbar'
import Settings from './components/Layout/Settings/Settings'
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'currentTheme',
      'currentAppStatus'
    ]),
    isAppReady () {
      if (this.currentAppStatus !== 'running') {
        return false
      } else return true
    }
  },
  methods: {
    ...mapMutations([
      'setIsAuthToTrue',
      'setAppStatus',
      'setTheme'
    ])
  },
  components: {
    Sidebar,
    Navbar,
    Settings
  },
  created: async function () {
    // localStorage.removeItem('bank-data')
    const htmlElement = document.documentElement
    htmlElement.setAttribute('theme', 'dark-blue')
    this.setTheme('dark-blue')

    const localData = localStorage.getItem('bank-data')
    if (!localData) {
      console.log('no local data')
      return
    }
    const data = JSON.parse(localData)
    if (!data.token || !data.expiryDate) {
      console.log('NO TOKEN')
      return
    }
    if (new Date(data.expiryDate) <= new Date()) {
      console.log('Token not valid anymore')
      return
    }
    this.setIsAuthToTrue(data)
    axios.defaults.headers.common.Authorization = 'Bearer ' + data.token
    const initialization = await this.$store.dispatch('initialize')
    if (initialization) {
      this.loading = false
    }
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
  overflow-x: hidden;
  color: var(--app-text-color);
  &::-webkit-scrollbar {
    display: none;
  }
}

.app-main {
  display: grid;
  grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
  grid-template-rows: 9rem max-content;
  background: var(--app-bg-primary);
  max-width: 100vw;
  .app__view {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    background: var(--app-bg-primary);
    min-height: calc(100vh - 9rem);
    width: 100%;
    padding-top: 2rem;
    position: relative;
  }
  .app__title {
    &--md {
      font-size: $font-xl;
    }
  }
}

.flip-enter-active {
    animation: flip-in .5s ease-out forwards;
}
.flip-leave-active {
    animation: flip-out .5s ease-out forwards;
}
@keyframes flip-out {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(90deg);
    }
}
@keyframes flip-in {
    from {
        transform: rotateY(90deg);
    }
    to {
        transform: rotateY(0deg);
    }
}

</style>
