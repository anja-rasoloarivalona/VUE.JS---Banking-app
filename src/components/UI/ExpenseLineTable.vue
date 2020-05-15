<template>
    <div
        class="expense"
        :class="{'bg-on-surfaceColor': index % 2 === 0, 'bg-surfaceColor': index % 2 !== 0 }"
        @mouseleave="showList = false"
    >
        <div class="expense__name">
            <div class="expense__name__color" :style="{backgroundColor: expense.color}"></div>
            <div>{{ expense.name}}</div>
        </div>
        <div>{{ expense.expenseType}}</div>
        <div>${{ expense.amount | amount}}</div>
        <div v-if="expense.nextPayout">{{ expense.nextPayout | short-date}}</div>
        <div v-else>-</div>
        <div class="expense__cta" @click="showList = !showList" @mouseenter="showList = true">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="expense__cta__list" v-if="showList" :class="{isLast: isLast }">
            <li class="expense__cta__list__item" @click="editExpense(expense)">
                Edit
            </li>
            <li class="expense__cta__list__item">
                Delete
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      showList: false,
      isLast: false
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop',
      'setEditedExpense'
    ]),
    editExpense (expense) {
      this.setEditedExpense(expense)
      this.openBackdrop('expense')
    }
  },
  mounted () {
    if (this.index + 1 === this.lastIndex) {
      this.isLast = true
    }
  },
  props: {
    expense: {
      required: true,
      type: Object
    },
    index: Number,
    lastIndex: Number
  }
}
</script>

<style lang="scss" scoped>
.expense {
  display: flex;
  padding: 2rem 0;
  padding-left: 2rem;
  position: relative;
  & > * {
    width: calc(100% / 4);
    font-size: $font-m;
  }
  &__name {
    display: flex;
    align-items: center;
    &__color {
      width: 1rem;
      height: 1rem;
      margin-right: 2rem;
      border-radius: 0.5rem;
    }
  }
  &__cta {
    position: absolute;
    right: 1rem;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 3rem !important;
    height: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease-in;
    cursor: pointer;
    background: transparent;
    & span {
      width: 3px !important;
      height: 3px;
      background: $color-grey--main;
      border-radius: 50%;
      margin: 1px;
      transition: all 0.3s ease-in;
    }
    &:hover {
      background: $color-grey--main;
      & span {
        background: $color-white;
      }
    }
    &__list {
        background: $color-white;
        box-shadow: 1px 5px 12px -1px rgba(15,15,15,1);
        border-radius: .5rem;
        padding: 1rem 0;
        position: absolute;
        right: 0;
        top: 100%;
        list-style: none;
        width: 15rem;
        color: var(--textColor--dark);
        z-index: 10;
        &::after {
            content: "";
            position: absolute;
            top: -1.2rem;
            right: 12%;
            // margin-left: -5px;
            border-width: 6px;
            border-style: solid;
            border-color:  transparent transparent $color-white transparent ;
        }
        &.isLast {
          top: -165%;
          &::after {
            bottom: -1.2rem;
            top: unset;
            border-color: $color-white transparent transparent transparent  ;
          }
        }
        &__item {
            padding: 1rem 0;
            padding-left: 1rem;
            cursor: pointer;
            // transition: all .3s ease-in;
            &:hover {
                background: var(--mainColor);
                color: $color-white
            }
        }
    }
  }
}
</style>
