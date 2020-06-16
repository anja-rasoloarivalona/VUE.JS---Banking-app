<template>
 <tr class="income" @mouseleave="showList = false">
   <income :income="income " type="subcategory"/>
    <td>{{$t(displayedCounter)}} {{$t(displayedPeriod)}}</td>
    <td class="income__amount">{{ income.amount | amount }}</td>
    <td>
        <span>{{ monthlyAverage | amount }}</span>
        <div class="income__cta" @click="showList = !showList" @mouseenter="showList = true">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="income__cta__list"
            v-if="showList"
            :style="{boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 5px 12px -1px rgb(165, 165, 165)'}">
                <li class="income__cta__list__item" @click="editIncome(income)"> {{$t('edit')}} </li>
                <li class="income__cta__list__item"> {{$t('delete')}} </li>
        </ul>
    </td>
  </tr>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Income from './Income'
export default {
  data () {
    return {
      showList: false,
      counter: [
        { value: 'once', i18: 'once' },
        { value: 'twice', i18: 'twice' },
        { value: 'three times', i18: 'threeTimes' },
        { value: 'four times', i18: 'fourTimes' },
        { value: 'five times', i18: 'fiveTimes' },
        { value: 'six times', i18: 'sixTimes' }
      ],
      period: [
        { value: 'a day', i18: 'perDay' },
        { value: 'a week', i18: 'perWeek' },
        { value: 'every two weeks', i18: 'everyTwoWeeks' },
        { value: 'a month', i18: 'perMonth' },
        { value: 'a year', i18: 'perYear' }
      ]
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
    displayedCounter () {
      let counter = ''
      this.counter.find((c, index) => {
        if (c.value === this.income.frequency.counter) {
          counter = this.counter[index].i18
          return true
        }
      })
      return counter
    },
    displayedPeriod () {
      let period = ''
      this.period.find((c, index) => {
        if (c.value === this.income.frequency.period) {
          period = this.period[index].i18
          return true
        }
      })
      return period
    },
    monthlyAverage () {
      return this.income.amount * this.frequencyOptions.period[this.income.frequency.period] * this.frequencyOptions.counter[this.income.frequency.counter]
    }
  },
  mounted () {
    // console.log('income', this.income)
  },
  props: {
    income: {
      required: true,
      type: Object
    }
  },
  components: {
    Income
  }
}
</script>

<style lang="scss" scoped>
.income {
  border-bottom: 1px solid var(--lineColor);
  border-collapse: collapse;

  &__amount {
      color: var(--mainColor)
  }
  & td {
    width: calc(100% / 4);
    height: 5rem;
    font-size: $font-m;
    text-align: start;
    padding-left: 2rem;
    position: relative;
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
