<template>
  <div class="nav">
    <ul class="nav__list">
      <router-link to="/" tag="div"><a>Dashboard</a></router-link>
      <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
      <router-link to="/wallet" tag="div"><a>Wallet</a></router-link>
      <router-link to="/savings-plan" tag="div"><a>Savings plan</a></router-link>
    </ul>
    <div class="nav__cta">
      <icon name='bell' size="large" color='grey'/>
      <icon name='settings' size="large" color='grey'/>
      <div class="nav__cta__userImg"></div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
.nav {
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  background: $color-grey--light;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $color-line;
  position: relative;
  z-index: 3;
  &__list {
    display: flex;
    div {
      margin-right: 3rem;
      a {
        color: $color-grey--dark;
        text-decoration: none;
        font-size: $font-m;
      }
      &.router-link-exact-active a {
            color: $color-primary;
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
        background-image: url('../assets/profile.jpg');
        background-position: center;
        background-size: cover;
        border-radius: 50%;
      }
  }
}
</style>
