<template>
    <div class="budget">
        <div class="budget__nav">
            <div class="budget__nav__item" :class="{active: active === 'plan'}" @click="active = 'plan'">Plan</div>
            <div class="budget__nav__item" :class="{active: active === 'report'}" @click="active = 'report'">Report</div>
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
    width: 100%;
    max-width: 120rem;
    background: var(--surfaceColor);
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    &__nav {
        display: flex;
        background: var(--backgroundColor);
        font-size: $font-m;
        &__item {
            width: 15rem;
            padding: 1.6rem 0;
            // margin-right: 1rem;
            // background: red;
            background: var(--on-surfaceColor);
            color: var(--textColor--dark);
            text-align: center;
            transition: all .3s ease-in;
            cursor: pointer;
            &.active {
                background: var(--surfaceColor);
                color: var(--mainColor)
            }
        }
    }
    &__view {
        // background: red;
        width: 100%;
        flex: 1;
        padding: 3rem;
        overflow: hidden;
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
