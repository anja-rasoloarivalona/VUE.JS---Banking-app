<template>
  <div id="app" class="app">
    <sidebar />
    <navbar />
    <transition name="fade" mode="out-in" appear v-if="!isUserAuthed">
        <auth />
    </transition>
    <div class="app__view" v-else>
        <router-view name="setup" v-if="currentAppStatus === 'setup'"/>
    </div>
    <!-- <router-view name="starter" v-if="!isAppReady"/>
    <div v-else-if="!loading" class="app-main">
      <sidebar></sidebar>
      <navbar></navbar>
      <backdrop v-if="backdropState"></backdrop>
      <div class="app__view">
        <router-view/>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import Sidebar from './components/Layout/Sidebar/Sidebar'
import Navbar from './components/Layout/Navbar/Navbar'
import Auth from './views/Authentication/Auth'
// import Backdrop from './components/Layout/Backdrop/Backdrop'
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'isUserAuthed',
      'currentTheme',
      'currentAppStatus',
      'backdropState'
    ]),
    isAppReady () {
      if (this.currentAppStatus !== 'running') {
        return false
      } else return true
    }
  },
  watch: {
    '$store.state.user.wallets': {
      handler: 'setBalanceAmount',
      immediate: true
    }
  },
  methods: {
    ...mapMutations([
      'setIsAuthToTrue',
      'setAppStatus',
      'initBalance'
    ]),
    setBalanceAmount () {
      let balance = 0
      const creditCard = ['Visa', 'MasterCard']
      this.$store.state.user.wallets.forEach(wallet => {
        if (!creditCard.includes(wallet.walletType)) {
          balance += wallet.amount
        } else {
          balance -= wallet.amount
        }
      })
      this.initBalance(balance)
    }
  },
  components: {
    Sidebar,
    Auth,
    Navbar
    // Backdrop
  },
  created: async function () {
    // localStorage.removeItem('bank-data')
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
::-webkit-scrollbar {
    display: none !important;
}
.app {
  display: grid;
  grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
  grid-template-rows: 9rem max-content;
  background: #f5f5f5;
  max-width: 100vw;
  &__view {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    background: #f5f5f5;
    min-height: calc(100vh - 9rem);
    height: 100%;
    width: 100%;
    padding-top: 3rem;
    position: relative;
  }
}
</style>
