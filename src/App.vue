<template>
  <div id="app">
    <router-view name="starter" v-if="!isAppReady"/>
    <div v-else-if="!loading" class="app-main">
      <sidebar></sidebar>
      <navbar></navbar>
      <backdrop v-if="backdropState"></backdrop>
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
import Backdrop from './components/Layout/Backdrop/Backdrop'
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
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
    Navbar,
    Backdrop
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
  color: var(--textColor);
  &::-webkit-scrollbar {
    display: none;
  }
}

.bg-mainColor {
  background: var(--mainColor);
}

.bg-surfaceColor {
  background: var(--surfaceColor);
}

.bg-on-surfaceColor {
  background: var(--on-surfaceColor);
}

::-webkit-scrollbar {
    display: none !important;
}

.app-main {
  display: grid;
  grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
  grid-template-rows: 9rem max-content;
  background: var(--backgroundColor);
  max-width: 100vw;
  .app__view {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    background: var(--backgroundColor);
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

.fade-enter-active {
    animation: fade-in .5s ease-out forwards;
}
.fade-leave-active {
    animation: fade-out .5s ease-out forwards;
}

@keyframes fade-in {
    from {
        transform: translateY(2rem);
        opacity: 0;
    }
    to {
        transform: translateY(0rem);
        opacity: 1;
    }
}

@keyframes fade-out {
    from {
        transform: translateY(0rem);
        opacity: 1;
    }
    to {
        transform: translateY(2rem);
        opacity: 0;
    }
}

</style>
