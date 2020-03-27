<template>
    <div class="transactionsContainer" v-if="!showForm">
        <div class="transactions__empty" v-if="this.$store.state.user.monthlyReports.length < 1">
           <div>No  transaction</div>
           <app-btn normal primary @click.native="showForm = true">New transaction</app-btn>
        </div>
        <div class="transactions" v-else>
            <app-btn normal primary @click.native="showForm = true">New transaction</app-btn>
            <transactions-table @editTransaction="edit"></transactions-table>
        </div>
    </div>
    <div v-else>
        <transactions-form @closeForm="showForm = false" :editedTransaction="editedTransaction"></transactions-form>
    </div>
</template>

<script>
import TransactionsForm from './TransactionsForm'
import TransactionTable from './TransactionsTable'
export default {
  data () {
    return {
      showForm: false,
      editedTransaction: false
    }
  },
  methods: {
    edit (transaction) {
      this.showForm = true
      this.editedTransaction = transaction
    }
  },
  components: {
    'transactions-form': TransactionsForm,
    'transactions-table': TransactionTable
  }
}
</script>

<style lang="scss" scoped>
.transactionsContainer {

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
