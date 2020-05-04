<template>
  <div id="app" class="app bg-default">
    <loader v-if="loading"/>
    <template v-else>
      <sidebar />
      <navbar />
      <transition name="fade" mode="out-in" appear v-if="!isUserAuthed">
          <auth />
      </transition>
      <div class="app__view bg-default" v-else>
          <router-view name="setup" v-if="currentAppStatus.includes('setup')"/>
          <router-view v-else />
          <backdrop v-if="backdrop.isDisplayed">
              <modal v-if="modal.isDisplayed"/>
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
import Modal from './components/Layout/Modal/Modal'
import Backdrop from './components/Layout/Backdrop/Backdrop'
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
      'modal',
      'backdrop',
      'localData',
      'localTheme',
      'user'
    ]),
    isAppReady () {
      if (this.currentAppStatus !== 'running') {
        return false
      } else return true
    }
  },
  watch: {
    'user.wallets': {
      handler: 'setBalanceAmount',
      immediate: true
    }
  },
  methods: {
    ...mapMutations([
      'setIsAuthToTrue',
      'setAppStatus',
      'initBalance',
      'setTheme'
    ]),
    setBalanceAmount () {
      let balance = 0
      const creditCard = ['Visa', 'MasterCard']
      this.user.wallets.forEach(wallet => {
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
    Navbar,
    Loader,
    Modal,
    Backdrop
  },
  created: async function () {
    // localStorage.removeItem('bank-data')
    // localStorage.removeItem('bank-theme')
    if (this.localTheme && this.localTheme !== '') {
      this.setTheme(this.localTheme)
    } else {
      this.setTheme('light-green')
    }
    if (!this.localData) {
      console.log('no local data')
      this.loading = false
      return
    }
    const data = JSON.parse(this.localData)
    if (!data.token || !data.expiryDate) {
      console.log('NO TOKEN')
      this.loading = false
      return
    }
    if (new Date(data.expiryDate) <= new Date()) {
      console.log('Token not valid anymore')
      this.loading = false
      return
    }
    axios.defaults.headers.common.Authorization = 'Bearer ' + data.token
    const initialization = await this.$store.dispatch('fetchUserData')
    if (initialization) {
      this.setIsAuthToTrue(data)
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
</style>
