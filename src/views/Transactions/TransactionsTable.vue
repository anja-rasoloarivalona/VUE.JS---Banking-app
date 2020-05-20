<template>
    <div class="transactions">
        <table class="transactions__table" :class="{'light': theme.isLight, 'dark': theme.isDark}">
            <thead>
                <tr>
                    <th class="transactions__table--date">Date</th>
                    <th class="transactions__table--name">Name</th>
                    <th class="transactions__table--counterparty">Counterparty</th>
                    <th class="transactions__table--wallet">Used wallet</th>
                    <th class="transactions__table--details">Details</th>
                    <th class="transactions__table--amount">Amount</th>
                    <th class="transactions__table--status">Status</th>
                </tr>
            </thead>
            <tbody v-if="displayedTransactions.length > 0">
                <app-transaction
                    v-for="(transaction, index) in displayedTransactions"
                    :key="transaction._id"
                    :index="index"
                    :lastIndex="displayedTransactions.length"
                    :transaction="transaction"
                    @editTransaction1="edit"
                >
                </app-transaction>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7"><div class="transactions__empty">No transactions related to {{ name }} has been found</div></td>
              </tr>
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
      const displayedTransactions = []
      this.userTransactions.forEach(transaction => {
        const d = new Date(transaction.date)
        const period = `${d.getMonth() + 1}-${d.getFullYear()}`
        if (period === currentPeriod) {
          for (const name in this.usersIncomesAndExpenses) {
            if (this.usersIncomesAndExpenses[name]._id === transaction.budgetId) {
              transaction.name = name
            }
          }
          if (this.name === 'All') {
            displayedTransactions.push(transaction)
          } else {
            if (transaction.name === this.name) {
              displayedTransactions.push(transaction)
            }
          }
        }
      })
      this.displayedTransactions = displayedTransactions
    }
  },
  computed: {
    ...mapGetters([
      'userTransactions',
      'usersIncomesAndExpenses',
      'theme'
    ])
  },
  watch: {
    period: function (currentPeriod) {
      this.setDisplayedTransactions(currentPeriod)
    },
    name: function () {
      this.setDisplayedTransactions(this.period)
    },
    userTransactions: function () {
      this.setDisplayedTransactions(this.period)
    }
  },
  props: {
    period: String,
    name: String
  },
  components: {
    appTransaction: Transaction
  }
}
</script>

<style lang="scss" scoped>
.transactions {
  & table, table th {
    border-collapse: collapse;
  }
  &__table {
    width: 100%;
    &--date {
      width: 9%;
    }
    &--name {
      width: 9%;
    }
    &--counterparty {
      width: 12%;
    }
    &--wallet {
      width: 13%;
    }
    &--details {

    }
    &--amount {
      width: 10%;
    }
    &--status {
      width: 10%;
    }

    & th {
      height: 5rem;
      text-align: start;
      padding-left: 2rem;
      font-size: $font-s;
      color: var(--textColor--dark);
      &:first-child {
      border-radius: 6px 0 0 0;
      }
      &:last-child {
        border-radius: 0 6px 0 0;
      }
      &:only-child{
        border-radius: 6px 6px 0 0;
      }
    }
    &.light {
      & thead tr {
        background: var(--mainColor);
        & th {
          color: $color-white;
        }
      }
    }
}
}

.transactions__empty {
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-l;
}
</style>
