<template>
    <tr class="expense" @mouseleave="showList = false">
        <expense type="category" :categoryName="expense.category" />
        <expense type="subcategory" :categoryName="expense.category" :subcategoryName="expense.subcategory"/>
        <td>{{$t(expensesList[expense.expenseType])}} </td>
        <td class="expense__amount">
          <span>{{ fixedExpenseMonthlyAverage | amount}}</span>
          <div class="expense__cta" @click="showList = !showList" @mouseenter="showList = true">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul
            class="expense__cta__list box-shadow"
            v-if="showList"
        >
            <li class="expense__cta__list__item" @click="editExpense(expense)">
                {{$t('edit')}}
            </li>
            <li class="expense__cta__list__item">
                {{$t('delete')}}
            </li>
        </ul>
        </td>
    </tr>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Expense from './Expense'
export default {
  data () {
    return {
      showList: false,
      isLast: false,
      expensesList: {
        Variable: 'variable',
        Fixed: 'fixed'
      }
    }
  },
  computed: {
    ...mapGetters([
      'frequencyOptions'
    ]),
    fixedExpenseMonthlyAverage () {
      return this.expense.amount * this.frequencyOptions.counter[this.expense.frequency.counter] * this.frequencyOptions.period[this.expense.frequency.period]
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
    console.log('expense', this.expense)
  },
  props: {
    expense: {
      required: true,
      type: Object
    },
    index: Number,
    lastIndex: Number
  },
  components: {
    Expense
  }
}
</script>

<style lang="scss" scoped>
.expense {
  border-bottom: 1px solid var(--lineColor);
  border-collapse: collapse;

  & td {
    width: calc(100% / 4);
    height: 5rem;
    font-size: $font-m;
    text-align: start;
    padding-left: 2rem;
  }
  &__amount {
     position: relative;
  }

  &__cta {
    position: absolute;
    right: 2rem;
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
        right: 1rem;
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
        // &.isLast {
        //   top: -165%;
        //   &::after {
        //     bottom: -1.2rem;
        //     top: unset;
        //     border-color: $color-white transparent transparent transparent  ;
        //   }
        // }
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
