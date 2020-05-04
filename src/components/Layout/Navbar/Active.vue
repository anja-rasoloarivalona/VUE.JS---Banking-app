<template>
    <div class="active">
      <ul class="active__list">
        <router-link to="/" tag="div"><a>Dashboard</a></router-link>
        <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
        <router-link to="/budget" tag="div"><a>Budget</a></router-link>
        <router-link to="/wallet" tag="div"><a>Wallet</a></router-link>
        <router-link to="/calendar" tag="div"><a>Calendar</a></router-link>
      </ul>
      <div class="active__cta">
        <app-icon name="eye" size="large" color="secondary" v-if="!isGhostModeActivated" @click="activateGhostMode"/>
        <app-icon name="eye-blocked" size="large" color="secondary" v-else @click="deactivateGhostMode"/>
        <app-icon name="settings" size="large" :color="isSettingsPannelShowed" @click="openModal('account')"/>
        <app-icon name="logout" size="large" color="secondary" @click="setIsAuthToFalse"/>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      activePath: null,
      showList: false
    }
  },
  computed: {
    ...mapGetters([
      'modal',
      'currentTheme',
      'isGhostModeActivated'
    ]),
    isSettingsPannelShowed () {
      if (this.modal.isDisplayed) {
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
      'openModal',
      'activateGhostMode',
      'deactivateGhostMode',
      'setIsAuthToFalse'
    ])
  },
  mounted () {
    this.activePath = this.$router.currentRoute.path
  }
}
</script>

<style lang="scss" scoped>
.active {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  width: 100%;
  max-width: 120rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
        font-size: $font-m;
        color: var(--mainColor);
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 10rem;
    }
}
</style>
