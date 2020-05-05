<template>
    <div class="transactionsContainer">
        <div class="transactions__empty" v-if="this.$store.state.user.monthlyReports.length < 1">
           <div>No  transaction</div>
           <app-btn normal primary @click.native="showForm = true">New transaction</app-btn>
        </div>
        <div class="transactions" v-else>
            <app-btn normal primary @click.native="showForm = true">New transaction</app-btn>
            <transactions-table @editTransaction="edit"></transactions-table>
        </div>
    </div>
</template>

<script>
import TransactionTable from './TransactionsTable'
export default {
  data () {
    return {
      editedTransaction: false
    }
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
      margin-bottom: 4rem;
    }
}
</style>
