<template>
    <div class="active">
      <ul class="active__list">
        <router-link to="/" tag="div"><a>Dashboard</a></router-link>
        <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
        <router-link to="/profile" tag="div"><a>Profile</a></router-link>
        <router-link to="/report" tag="div"><a>report</a></router-link>
      </ul>

      <div class="active__cta" v-click-outside="hideCtaList">
        <profile-toggler />
        <lang-switcher />
      </div>

    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LangSwitcher from './components/LangSwitcher/LangSwitcher'
import ProfileToggler from './components/ProfileToggler/ProfileToggler'
export default {
  data () {
    return {
      activePath: null,
      showList: false
    }
  },
  computed: {
    ...mapGetters([
      'settingsModal',
      'theme',
      'ghostModeIsEnabled'
    ]),
    isSettingsPannelShowed () {
      if (this.settingsModal.isDisplayed) {
        return 'secondary'
      } else return 'dark'
    }
  },
  watch: {
    $route (to) {
      this.activePath = to.path
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop',
      'activateGhostMode',
      'deactivateGhostMode',
      'setIsAuthToFalse',
      'clearUserData'
    ]),
    logout () {
      this.setIsAuthToFalse()
      this.clearUserData()
    },
    hideCtaList () {
      if (this.showList) {
        this.showList = false
      }
    }
  },
  mounted () {
    this.activePath = this.$router.currentRoute.path
  },
  components: {
    LangSwitcher,
    ProfileToggler
  }
}
</script>

<style lang="scss" scoped>
.active {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  // padding: 0 1rem;
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
        display: flex;
        align-items: center;
        // justify-content: space-between;
    }
}
</style>
