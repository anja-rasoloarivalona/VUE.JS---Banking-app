<template>
  <div class="navContainer">
    <div class="navBg">
      <div class="navBg__in"></div>
    </div>
    <div class="nav">
      <ul class="nav__list">
        <router-link to="/" tag="div"><a>Dashboard</a></router-link>
        <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
        <router-link to="/wallet" tag="div"><a>Wallet</a></router-link>
        <router-link to="/savings-plan" tag="div"><a>Savings plan</a></router-link>
      </ul>
      <div class="nav__cta">
        <app-icon name="bell" size="large" color="primary"/>
        <app-icon name="settings" size="large" color="primary"/>
        <div class="nav__cta__userImg"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
  background: var(--app-bg-secondary);
  position: relative;
  z-index: 2;
  &__in {
    background: var(--app-bg-primary);
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
  border-bottom: 1px solid var(--app-line-color);
  position: relative;
  z-index: 3;
  margin: 0 1rem;
  &__list {
    display: flex;
    div {
      margin-right: 3rem;
      a {
        color: var(--app-title-color-secondary);
        text-decoration: none;
        font-size: $font-m;
      }
      &.router-link-exact-active a {
            color: var(--app-color-main);
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
  }
}
</style>
