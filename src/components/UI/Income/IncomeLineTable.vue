<template>
 <tr class="income" @mouseleave="showList = false">
    <td class="income__name"> {{ income.name }} </td>
    <td>{{ income.frequency.counter}} {{income.frequency.period}}</td>
    <td class="income__amount"><b>${{ income.amount | amount }}</b></td>
    <td class="income__average">
        <span>${{ monthlyAverage | amount }}</span>
        <div class="income__cta" @click="showList = !showList" @mouseenter="showList = true">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="income__cta__list"
            v-if="showList"
            :style="{boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 5px 12px -1px rgb(165, 165, 165)'}">
                <li class="income__cta__list__item" @click="editIncome(income)"> Edit </li>
                <li class="income__cta__list__item"> Delete</li>
        </ul>
    </td>
  </tr>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      showList: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.income {
  border-bottom: 1px solid var(--lineColor);
  border-collapse: collapse;
  &__average {
      position: relative;
  }
  &__amount {
      color: var(--mainColor)
  }
  & td {
    width: calc(100% / 4);
    height: 5rem;
    font-size: $font-m;
    text-align: start;
    padding-left: 2rem;
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
        border-radius: .5rem;
        padding: 1rem 0;
        position: absolute;
        right: 0;
        top: 100%;
        list-style: none;
        width: 15rem;
        color: var(--textColor--dark);
        z-index: 100;
        &::after {
            content: "";
            position: absolute;
            top: -1.2rem;
            right: 12%;
            border-width: 6px;
            border-style: solid;
            border-color:  transparent transparent $color-white transparent ;
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
