<template>
    <div class="active">
      <ul class="active__list">
        <router-link to="/" tag="div"><a>Dashboard</a></router-link>
        <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
        <router-link to="/budget" tag="div"><a>Budget</a></router-link>
        <router-link to="/wallet" tag="div"><a>Wallet</a></router-link>
        <router-link to="/calendar" tag="div"><a>Calendar</a></router-link>
      </ul>
      <div class="active__cta" v-click-outside="hideCtaList">
        <app-icon name="eye" size="large" color="dark" v-if="!ghostModeIsEnabled" @click="activateGhostMode"/>
        <app-icon name="eye-blocked" size="large" color="dark" v-else @click="deactivateGhostMode"/>
        <app-icon name="settings" size="large" :color="isSettingsPannelShowed" @click="showList = !showList" />
        <app-icon name="logout" size="large" color="dark" @click="logout"/>
        <div
          class="active__cta__list"
          :style="{boxShadow: theme.isDark ? '1px 5px 12px -1px rgba(15,15,15,1)' : '1px 5px 12px -1px rgb(165, 165, 165)'}"
          v-if="showList"
        >
            <div class="active__cta__list__item">Account</div>
            <div class="active__cta__list__item" @click="openBackdrop('settings')">Settings</div>
            <div class="active__cta__list__item">Logout</div>
        </div>
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
        // color: var(--mainColor);
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 10rem;
        position: relative;
        &__list {
          position: absolute;
          top: 4rem;
          right: -1rem;
          width: 15rem;
          background: $color-white;
          // box-shadow: 1px 5px 12px -1px rgb(165, 165, 165);
          color: var(--textColor--dark);
          border-radius: .5rem;
          padding: 1rem 0;
          // overflow: hidden;
          &__item {
            // background: red;
            // margin-bottom: 1rem;
            padding: 1rem 0;
            padding-left: 2rem;
            // &:first-child {
            //   border-top-left-radius: .5rem;
            //   border-top-right-radius: .5rem;
            // }
            // &:last-child {
            //   border-bottom-left-radius: .5rem;
            //   border-bottom-right-radius: .5rem;
            // }
            cursor: pointer;
            &:hover {
              background: var(--mainColor);
              color: $color-white;
            }
          }
          // border: 2px solid var(--mainColor);
          &::after {
            content: "";
            position: absolute;
            top: -2rem;
            left: 53%;
            // margin-left: -5px;
            border-width: 10px;
            border-style: solid;
            border-color:  transparent transparent $color-white transparent ;
          }
        }
    }
}
</style>
