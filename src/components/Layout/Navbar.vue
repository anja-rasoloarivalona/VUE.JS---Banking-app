<template>
  <div class="navContainer">
    <div class="navBg">
      <div class="navBg__in"></div>
    </div>
    <div class="nav">
      <ul class="nav__list">
        <router-link to="/" tag="div"><a>Dashboard</a></router-link>
        <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
        <router-link to="/budget" tag="div"><a>Budget</a></router-link>
        <router-link to="/wallet" tag="div"><a>Wallet</a></router-link>
        <router-link to="/calendar" tag="div"><a>Calendar</a></router-link>
      </ul>
      <div class="nav__cta">
        <app-icon name="bell" size="large" color="secondary"/>
        <app-icon name="settings" size="large" :color="isSettingsPannelShowed" @click="openBackdrop('settings')"/>
        <div class="nav__cta__userImg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      activePath: null
    }
  },
  computed: {
    ...mapGetters([
      'currentBackdropState'
    ]),
    isSettingsPannelShowed () {
      if (this.currentBackdropState.modal === 'settings') {
        return 'primary'
      } else return 'secondary'
    }
  },
  watch: {
    $route (to) {
      this.activePath = to.path
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
    ])
  },
  mounted () {
    this.activePath = this.$router.currentRoute.path
  }
}
</script>

<style lang="scss" scoped>
.navContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
  grid-template-rows: 9rem;
  z-index: 3;
}
.navBg {
  grid-column: 2 / -1;
  grid-row: 1 / 2;
  background: var(--surfaceColor);
  position: relative;
  z-index: 2;
  &__in {
    background: var(--backgroundColor);
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    border-top-left-radius: 4rem;
  }
}
.nav {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  max-width: 120rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--on-surfaceColor);
  position: relative;
  z-index: 3;
  margin: 0 1rem;
  &__list {
    display: flex;
    div {
      margin-right: 3rem;
      a {
        color: var(--textColor--dark);
        text-decoration: none;
        font-size: $font-m;
      }
      &.router-link-exact-active a {
            color: var(--mainColor);
      }
    }
  }
  &__cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 10rem;
      &__userImg {
        width: 3rem;
        height: 3rem;
        background-image: url('../../assets/profile.jpg');
        background-position: center;
        background-size: cover;
        border-radius: 50%;
      }
      & div {
          svg {
            fill: red !important
          }
      }
  }
}
</style>
