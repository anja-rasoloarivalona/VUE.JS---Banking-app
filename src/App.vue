<template>
  <div id="app" class="app bg-default">
    <errors />
    <loader v-if="loading"/>
    <template v-else>
      <sidebar />
      <navbar />
      <transition name="fade" mode="out-in" appear v-if="!auth.isAuth">
          <auth />
      </transition>
      <div class="app__view bg-default" v-else>
          <router-view name="setup" v-if="auth.appStatus.includes('setup')"/>
          <transition v-else-if="auth.isAppReady" :name="routerTransition" mode="out-in" appear>
              <router-view />
          </transition>
          <backdrop v-if="backdrop.isDisplayed">
          </backdrop>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import Sidebar from './components/Layout/Sidebar/Sidebar'
import Navbar from './components/Layout/Navbar/Navbar'
import Auth from './views/Authentication/Auth'
import Loader from './components/Layout/Loader/Loader'
import Backdrop from './components/Layout/Backdrop/Backdrop'
import Errors from './components/Layout/Errors/Errors'
export default {
  data () {
    return {
      loading: true,
      routerTransition: 'slide-from-right'
    }
  },
  mounted: async function () {
    console.log('tricks', this.xpty)
    // localStorage.removeItem('bank-data')
    // localStorage.removeItem('bank-theme')
    this.initTheme()
    this.initAuthData()
    if (!this.auth.isAuth) {
      this.loading = false
      return
    }
    axios.defaults.headers.common.Authorization = 'Bearer ' + this.auth.token
    await this.$store.dispatch('fetchUserData')
    this.loading = false
  },
  computed: {
    ...mapGetters([
      'xpty',
      'backdrop',
      'user',
      'theme',
      'auth'
    ])
  },
  watch: {
    '$route' (to, from) {
      const paths = ['/', '/transactions', '/profile', '/report']
      const toIndex = paths.indexOf(to.path)
      const fromIndex = paths.indexOf(from.path)
      if (fromIndex < toIndex) {
        this.routerTransition = 'slide-from-right'
      } else {
        this.routerTransition = 'slide-from-left'
      }
    }
  },
  methods: {
    ...mapMutations([
      'initAuthData',
      'initTheme'
    ])
  },
  components: {
    Sidebar,
    Auth,
    Navbar,
    Loader,
    Backdrop,
    Errors
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
    // display: none !important;
}
.app {
  display: grid;
  grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
  grid-template-rows: 9rem max-content;
  // background: #f5f5f5;
  max-width: 100vw;
  min-height: 100vh;
  &__view {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    // background: #f5f5f5;
    min-height: calc(100vh - 9rem);
    height: 100%;
    width: 100%;
    padding-top: 3rem;
    position: relative;
    display: flex;
    justify-content: center;
  }
}
.full-absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.vc-min-w-full {
    height: 100%;
}
.vc-relative {
    height: 100%;
}
.vc-grid-container.grid {
    height: 100%;
}
.vc-grid-cell {
    height: 100%;
}
.vc-pane {
    height: 100%;
    padding-top: 2rem;
}
.vc-header {
    margin-bottom: 2rem;
}
.vc-arrows-container {
    top: 2rem
}
.vc-h-full {
    display: flex;
    align-items: center;
}
.vc-text-gray-900 {
    color: var(--textColor) !important
}
.vc-text-gray-800 {
    color: var(--mainColor);
}

// EXPENSES COLOOOOOR

.bg-mainColor {
    background: var(--mainColor) !important;
}

.bg-059782 {
  background: #059782 !important;
}
.bg-99a1d7 {
  background: #99a1d7 !important;
}
.bg-2bac49 {
  background: #2bac49 !important;
}
.bg-3144af {
  background: #3144af !important;
}
.bg-59bcd8 {
  background: #59bcd8 !important;
}
</style>
