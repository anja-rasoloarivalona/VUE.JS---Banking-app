<template>
    <div class="transactionsContainer">
        <div class="transactions__empty" v-if="this.$store.state.user.monthlyReports.length < 1">
           <div>No  transaction</div>
           <app-btn normal primary @click.native="showForm = true">New transaction</app-btn>
        </div>
        <div class="transactions" v-else>
            <div class="transactions__header">
               <app-select-input v-model="period" :options="periodList" id="period" row/>
            </div>
            <!-- <app-btn normal primary @click.native="showForm = true">New transaction</app-btn> -->
            <transactions-table @editTransaction="edit" :period="period"></transactions-table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionTable from './TransactionsTable'
export default {
  data () {
    return {
      editedTransaction: false,
      period: '',
      periodList: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    this.user.monthlyReports.forEach(report => {
      this.periodList.push(report.period)
    })
    const d = new Date()
    const period = `${d.getMonth() + 1}-${d.getFullYear()}`
    this.period = period
  },
  methods: {
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
      margin-bottom: 2rem;
      padding-left: 2rem;
      & label {
        width: 20rem;
      }
    }
}
</style>
