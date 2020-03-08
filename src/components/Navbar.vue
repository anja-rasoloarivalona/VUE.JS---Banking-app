<template>
  <div class="nav">
    <ul class="nav__list">
      <router-link to="/" tag="div"><a>Dashboard</a></router-link>
      <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
      <router-link to="/wallet" tag="div"><a>Wallet</a></router-link>
      <router-link to="/savings-plan" tag="div"><a>Savings plan</a></router-link>
    </ul>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.nav {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  width: calc(100vw - 20rem);
  background: $color-secondary;
  display: flex;
  align-items: center;
  padding-left: 10rem;
  &__list {
    background: blue;
    display: flex;
    div {
         width: 10rem;
         text-align: center;
      a {
        color: $color-white;
        text-decoration: none;
        font-size: $font-m;
      }
    }
  }
}
</style>
