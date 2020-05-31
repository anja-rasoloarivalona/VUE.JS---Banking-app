<template>
 <div class="income" @mouseleave="showList = false">
    <div class="income__name">
      {{ income.name }}
    </div>
    <div>{{ income.frequency.counter}} {{income.frequency.period}}</div>
    <div>${{ income.amount | amount }}</div>
    <div>${{ monthlyAverage | amount }}</div>
    <div class="income__cta" @click="showList = !showList" @mouseenter="showList = true">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul
      class="income__cta__list"
      v-if="showList"
      :class="{isLast: isLast }"
      :style="{boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 5px 12px -1px rgb(165, 165, 165)'}"
    >
      <li class="income__cta__list__item" @click="editIncome(income)">
        Edit
      </li>
      <li class="income__cta__list__item">
        Delete
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
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
      'setEditedIncome'
    ]),
    editIncome (income) {
      this.setEditedIncome(income)
      this.openBackdrop('income')
    }
  },
  mounted () {
    if (this.index + 1 === this.lastIndex && this.lastIndex > 1) {
      this.isLast = true
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'frequencyOptions'
    ]),
    monthlyAverage () {
      return this.income.amount * this.frequencyOptions.period[this.income.frequency.period] * this.frequencyOptions.counter[this.income.frequency.counter]
    }
  },
  props: {
    income: {
      required: true,
      type: Object
    },
    index: Number,
    lastIndex: Number
  }
}
</script>

<style lang="scss" scoped>
.income {
  display: flex;
  padding: 2rem 0;
  padding-left: 2rem;
  position: relative;
  border-bottom: 1px solid var(--lineColor);
  & > * {
    width: calc(100% / 4);
    font-size: $font-m;
  }
  // &__name {
  //   display: flex;
  //   align-items: center;
  //   &__color {
  //     width: 1rem;
  //     height: 1rem;
  //     margin-right: 2rem;
  //     border-radius: 0.5rem;
  //     background: var(--mainColor)
  //   }
  // }
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
        border-radius: .5rem;
        padding: 1rem 0;
        position: absolute;
        right: 0;
        top: 100%;
        list-style: none;
        width: 15rem;
        color: var(--textColor--dark);
        &::after {
            content: "";
            position: absolute;
            top: -1.2rem;
            right: 12%;
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
            &:hover {
                background: var(--mainColor);
                color: $color-white
            }
        }
    }
  }
}
</style>
