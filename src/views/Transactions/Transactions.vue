<template>
  <keep-alive>
    <div class="transactionsContainer">
        <div class="transactions__empty" v-if="this.$store.state.user.monthlyReports.length < 1">
           <div>No  transaction</div>
           <app-btn normal primary @click.native="showForm = true">New transaction</app-btn>
        </div>
        <div class="transactions" v-else>
            <div class="transactions__header">
                <div class="transactions__header__icon">
                    <app-icon name="filter" color="secondary" size="extra-large"/>
                </div>
               <app-select-input v-model="period" :options="periodList" id="period" row/>
               <app-select-input v-model="name" :options="namesList" id="name" row/>
               <!-- <app-select-input v-model="category" :options="categorysList" id="category" row/> -->
            </div>
            <transactions-table :transactions="userTransactions" />
        </div>
    </div>
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionTable from '@/components/UI/Transaction/TransactionTable'
export default {
  data () {
    return {
      editedTransaction: false,
      period: '',
      name: 'All',
      category: 'All',
      periodList: [],
      namesList: [],
      categorysList: []
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'usersIncomesAndExpenses',
      'userTransactions'
    ])
  },
  mounted () {
    const namesList = ['All']
    const categorysList = ['All']
    for (const name in this.usersIncomesAndExpenses) {
      if (!this.namesList.includes(this.usersIncomesAndExpenses[name].name) && this.usersIncomesAndExpenses[name].name) {
        namesList.push(this.usersIncomesAndExpenses[name].name)
      }
      if (!this.categorysList.includes(this.usersIncomesAndExpenses[name].category) && this.usersIncomesAndExpenses[name].category) {
        categorysList.push(this.usersIncomesAndExpenses[name].category)
      }
    }
    this.namesList = namesList
    this.categorysList = categorysList
    this.load()
  },
  watch: {
    userTransactions: function () {
      this.load()
    }
  },
  methods: {
    load () {
      // SET PERIOD LIST
      const list = []
      this.user.monthlyReports.forEach(report => {
        if (report.transactions.length > 0) {
          list.push(report.period)
        }
      })
      this.periodList = list
      // SET CURRENT PERIOD
      const d = new Date()
      const period = `${d.getMonth() + 1}-${d.getFullYear()}`
      this.period = period
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

<style lang="scss" scoped>
.transactionsContainer {
  width: 100%;
  max-width: 120rem;
  background: var(--surfaceColor);
  height: min-content;
  border-radius: .5rem;
  padding: 3rem;
}
.transactions {
    &__empty {
        display: flex;
        align-items: center;
        font-size: $font-m;
        & div:first-child {
            margin-right: 2rem;
        }
    }
    & button {
      // margin-bottom: 4rem;
    }
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 6rem;
      padding-left: 2rem;
      &__icon {
        margin-right: 5rem;
      }
      & label {
        width: 20rem;
        margin-bottom: 0;
        margin-right: 5rem;
      }
    }
}
</style>
