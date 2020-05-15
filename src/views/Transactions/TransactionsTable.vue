<template>
    <div class="transactions">
        <table class="transactions__table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Counterparty</th>
                    <th>Used wallet</th>
                    <th>Details</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <app-transaction
                    v-for="(transaction, index) in displayedTransactions"
                    :key="transaction._id"
                    :index="index"
                    :lastIndex="displayedTransactions.length"
                    :transaction="transaction"
                    :class="{'bg-on-surfaceColor': index % 2 === 0, 'bg-surfaceColor': index % 2 !== 0 }"
                    @editTransaction1="edit"
                >
                </app-transaction>
            </tbody>
        </table>
    </div>
</template>

<script>
import Transaction from '@/components/UI/Transaction'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      displayedTransactions: []
    }
  },
  methods: {
    edit (transaction) {
      this.$emit('editTransaction', transaction)
    },
    setDisplayedTransactions (currentPeriod) {
      const res = []
      this.userTransactions.forEach(transaction => {
        const d = new Date(transaction.date)
        const period = `${d.getMonth() + 1}-${d.getFullYear()}`
        if (period === currentPeriod) {
          res.push(transaction)
        }
      })
      this.displayedTransactions = res
    }
  },
  computed: {
    ...mapGetters([
      'userTransactions'
    ])
  },
  watch: {
    period: function (currentPeriod) {
      this.setDisplayedTransactions(currentPeriod)
    },
    userTransactions: function () {
      this.setDisplayedTransactions(this.period)
    }
  },
  props: {
    period: String
  },
  components: {
    appTransaction: Transaction
  }
}
</script>

<style lang="scss" scoped>
table, table th {
  border-collapse: collapse;
}
table {
  width: 100%;
  & th {
    height: 5rem;
    text-align: start;
    padding-left: 2rem;
    font-size: $font-s;
    background: var(--app-bg-primary);
    color: var(--textColor--dark);
  }
}
</style>
