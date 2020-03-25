<template>
    <div class="transactionsContainer" v-if="!showForm">
        <div class="transactions__empty" v-if="this.$store.state.transactions.length < 1">
           <div>No  transaction</div>
           <div class="transactions__add" @click="showForm = true">
                <app-icon name="add" size="extra-large" color="grey--dark"/>
           </div>
        </div>
        <div class="transactions" v-else>
            <div class="transactions__add" @click="showForm = true">
                <app-icon name="add" size="extra-large" color="grey--dark"/>
           </div>
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
    &__add {
         width: 6rem;
         height: 6rem;
         display: flex;
         align-items: center;
         justify-content: center;
         border: 1px dashed $color-grey--dark;
         border-radius: .5rem;
         cursor: pointer;
    }
}
</style>
