<template>
    <div class="budget">
        <div class="budget__nav" :class="{isLight: theme.isLight, isDark: theme.isDark}">
            <div class="budget__nav__filler"></div>
            <div class="budget__nav__list">
                <div class="budget__nav__list__item" :class="{active: active === 'plan'}" @click="active = 'plan'">Plan</div>
                <div class="budget__nav__list__item" :class="{active: active === 'report'}" @click="active = 'report'">Report</div>
            </div>
        </div>
        <div class="budget__view">
          <transition :name="budgetTransitionAnimation" mode="out-in">
            <component :is="active"></component>
          </transition>
        </div>
    </div>
</template>

<script>
import Plan from './Plan/Plan'
import Report from './Report/Report'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      active: 'plan',
      showForm: false,
      selected: null,
      selectedType: null
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ]),
    budgetTransitionAnimation () {
      if (this.active === 'plan') {
        return 'slide-from-left'
      } else {
        return 'slide-from-right'
      }
    }
  },
  methods: {
    selectItem (type, item) {
      this.selected = item
      this.selectedType = type
      this.showForm = true
    },
    closeForm () {
      this.selected = false
      this.selectedType = null
      this.showForm = null
    }
  },
  components: {
    Plan,
    Report
  }
}
</script>

<style lang="scss" scoped>
.budget {
    width: calc(100% - 2rem);
    max-width: 120rem;
    background: var(--surfaceColor);
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 5rem;
    &__nav {
        display: flex;
        flex-direction: column;
        background: var(--backgroundColor);
        font-size: $font-m;
        height: 8rem;
        position: fixed;
        transform: translateY(-3rem);
        width: 100%;
        z-index: 2;
        &__filler {
          height: 3rem;
        }
        &__list {
          display: flex;
          height: 5rem;
          &__item {
            width: 15rem;
            background: var(--on-surfaceColor);
            color: var(--textColor--dark);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .3s ease-in;
            cursor: pointer;
              &:first-child {
                border-top-left-radius: .5rem;
              }
              &:last-child {
                border-top-right-radius: .5rem;
              }
            }
        }
        &.isDark {
          & .budget__nav__list__item {
            background: rgb(66, 66, 66);
            &.active {
              background: var(--surfaceColor);
              color: var(--mainColor)
            }
          }
        }
        &.isLight {
          & .budget__nav__list__item {
            background: var(--backgroundColor);
            &.active {
              background: var(--surfaceColor);
              color: var(--mainColor)
            }
          }
        }
    }
    &__view {
        // background: red;
        width: 100%;
        flex: 1;
        padding: 3rem;
        padding-bottom: 0;
        overflow: hidden;
        margin-top: 5rem;
        border-top-right-radius: 1rem;
        // height: 100%;
    }
    &__section {
        background: var(--app-item-bg);
        padding: 1rem;
        padding-left: 3rem;
        padding-bottom: 2rem;
        border-radius: .5rem;
        margin-bottom: 3rem;
        transition: all .2 ease-in;
        &.app-bg-primary {
            background: var(--app-bg-primary);
        }
        &__title {
            height: 3rem;
            display: flex;
            align-items: center;
            color: var(--app-text-color);
            margin-bottom: 2rem;
        }
        &__list {
            & .income {

            }
        }
    }
}
</style>
