<template>
  <keep-alive>
    <div class="transactionsContainer">
        <div class="transactions-view__empty" v-if="this.$store.state.user.monthlyReports.length < 1">
           <div>You do not have transactions yet</div>
           <app-btn normal primary @click.native="openBackdrop('transactions')">Add transaction</app-btn>
        </div>
        <div class="transactions-view" v-else>
            <div class="transactions-view__header">
                <div class="transactions-view__header__icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
               <app-select-input v-model="filters.period" :options="periodList" row i18/>
               <app-select-input v-model="filters.category" :options="displayedCategories" row i18/>
               <app-select-input v-model="filters.subcategory" :options="displayedSubcategories"  row i18/>
               <app-select-input v-model="filters.sort" :options="periodList" row/>
            </div>
            <transactions-table :transactions="displayedTransactions" />
        </div>
    </div>
  </keep-alive>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TransactionTable from '@/components/UI/Transaction/TransactionTable'
export default {
  data () {
    return {
      filters: {
        period: {
          value: '',
          i18: '',
          custom: ''
        },
        category: {
          value: 'All',
          i18: 'allCategories'
        },
        subcategory: {
          value: 'All',
          i18: 'allSubcategories'
        },
        sort: ''
      },
      editedTransaction: false,
      incomesAndExpensesList: null,
      periodList: []
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'expensesList',
      'incomesList',
      'userTransactions'
    ]),
    displayedTransactions () {
      let list = []
      if (this.filters.category.value !== 'All') {
        this.userTransactions.forEach(transaction => {
          if (transaction.category === this.filters.category.value) {
            if (this.filters.subcategory.value === 'All') {
              list.push(transaction)
            } else {
              if (transaction.subcategory === this.filters.subcategory.value) {
                list.push(transaction)
              }
            }
          }
        })
      } else {
        list = this.userTransactions
      }
      return list
    },
    displayedCategories () {
      let list = []
      if (this.incomesAndExpensesList) {
        for (const item in this.incomesAndExpensesList) {
          list.push({
            value: item,
            i18: this.incomesAndExpensesList[item].i18
          })
        }
      }
      if (this.filters.category.value !== 'All') {
        list = [{ value: 'All', i18: 'allCategories' }, ...list]
      }
      return list
    },
    displayedSubcategories () {
      let list = []
      if (this.filters.category && this.filters.category.value !== '' && !this.filters.category.value.includes('All')) {
        for (const item in this.incomesAndExpensesList[this.filters.category.value].subcategory) {
          list.push({
            value: item,
            i18: this.incomesAndExpensesList[this.filters.category.value].subcategory[item].i18
          })
        }
      }
      if (this.filters.subcategory.value !== 'All') {
        list = [{ value: 'All', i18: 'allSubcategories' }, ...list]
      }
      return list
    }
  },
  mounted () {
    const categories = {}
    this.userTransactions.forEach(transaction => {
      if (!(transaction.category in categories)) {
        categories[transaction.category] = {
          name: transaction.category,
          i18: transaction.category !== 'Income' ? this.expensesList[transaction.category].i18 : 'income',
          subcategory: {
            [transaction.subcategory]: transaction.category === 'Income' ? this.incomesList.category[transaction.subcategory] : this.expensesList[transaction.category].subcategory[transaction.subcategory]
          }
        }
      } else {
        if (!(transaction.subcategory in categories[transaction.category].subcategory)) {
          categories[transaction.category].subcategory[transaction.subcategory] = transaction.category === 'Income' ? this.incomesList.category[transaction.subcategory] : this.expensesList[transaction.category].subcategory[transaction.subcategory]
        }
      }
    })
    this.incomesAndExpensesList = categories
    this.load()
  },
  watch: {
    userTransactions: function () {
      this.load()
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
    ]),
    load () {
      // SET PERIOD LIST
      const list = []
      this.user.monthlyReports.forEach(report => {
        if (report.transactions.length > 0) {
          const d = report.period.split('-')
          list.push({
            value: report.period,
            i18: `month${d[0]}--full`,
            custom: d[1]
          })
        }
      })
      this.periodList = list
      console.log('list', this.periodList)
      // SET CURRENT PERIOD

      const d = new Date()
      const month = d.getMonth() + 1
      const period = `${month}-${d.getFullYear()}`
      this.filters.period = {
        value: period,
        i18: `month${month}--full`,
        custom: d.getFullYear()
      }
      console.log('period', this.filters.period)
    },
    edit (transaction) {
      this.editedTransaction = transaction
    }
  },
  components: {
    'transactions-table': TransactionTable
  }
}
</script>

<style lang="scss">
.transactionsContainer {
  width: calc(100% - 2rem);
  max-width: 120rem;
  background: var(--surfaceColor);
  height: min-content;
  border-radius: .5rem;
  height: 95%;
  display: flex;
  position: relative;
  // margin-bottom: 5rem;
}
.transactions-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  // background: red;
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: $font-m;
        flex-grow: 1;
        & div:first-child {
          margin-bottom: 2rem;
        }
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 2rem;
      // background: blue;
      border-top-left-radius: .5rem;
      border-top-right-radius: .5rem;
      padding: 0;
      padding-top: 3rem;
      padding-bottom: 5rem;
      // margin-bottom: 3rem;
      &__icon {
        margin-right: 1rem;
        height: 2rem;
        width: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & span {
          background: var(--secondaryColor);
          height: .2rem;
          &:first-child {
            width: 100%
          }
          &:nth-child(2){
            width: 80%
          }
          &:last-child {
            width: 60%;
          }
        }
      }
      & label {
        // width: 20rem;
        margin-bottom: 0;
        // background: salmon;
        & .select__value {
          min-width: 11vw !important;
        }
        &:nth-child(4){
          & span {
            width: 13rem;
          }
        }
      }
    }
}
</style>
