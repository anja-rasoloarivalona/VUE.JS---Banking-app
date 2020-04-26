<template>
  <div class="navContainer">
    <div class="navBg">
      <div class="navBg__in"></div>
    </div>
    <div class="nav">
      <ul class="nav__list">
        <router-link to="/" tag="div"><a>Dashboard</a></router-link>
      </ul>
      <div class="nav__cta">
        <app-icon name="user" size="xlarge" color="secondary" @click="showList = !showList"/>
        <div class="nav__cta__list" v-if="showList">
           <div @click="setIsAuthToFalse" class="nav__cta__logout">Logout</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      activePath: null,
      showList: false
    }
  },
  watch: {
    $route (to) {
      this.activePath = to.path
    }
  },
  methods: {
    ...mapMutations([
      'setIsAuthToFalse'
    ])
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
  position: relative;
  z-index: 2;
  background: $color-primary;
  &__in {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    border-top-left-radius: 4rem;
    background: $color-grey--light;
  }
}
.nav {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  max-width: 120rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $color-line;
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
      position: relative;
      &__list {
        position: absolute;
        width: 12rem;
        padding: 1.5rem 1rem;
        font-size: $font-m;
        right: -2rem;
        top: 140%;
        background: var(--mainColor);
        border-radius: .5rem;
        &::after {
          content: '';
          position: absolute;
          top: -.5rem;
          right: 2.6rem;
          width: 0;
          height: 0;
          border-left: .5rem solid transparent;
          border-right: .5rem solid transparent;
          border-bottom: .5rem solid var(--mainColor);
        }
      }
      &__logout {
        cursor: pointer;
      }
  }
}
</style>
