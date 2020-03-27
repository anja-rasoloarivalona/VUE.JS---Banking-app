<template>
    <div class="transactions">
        <table class="transactions__table">
            <thead>
                <tr>
                    <th>ID</th>
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
                    v-for="(transaction, index) in userTransactions"
                    :key="transaction._id"
                    :transaction="transaction"
                    :class="{'bg-white': index % 2 === 0, 'bg-blue': index % 2 !== 0 }"
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
  methods: {
    edit (transaction) {
      this.$emit('editTransaction', transaction)
    }
  },
  computed: {
    ...mapGetters([
      'userTransactions'
    ])
  },
  components: {
    appTransaction: Transaction
  }
}
</script>

<style lang="scss" scoped>
.transactions {
    background: $color-white;
}
table, table th {
//   border-top: 1px solid $color-line;
  border-bottom: 1px solid $color-line;
  border-collapse: collapse;
}
table {
  width: 100%;
  & th {
    height: 5rem;
    text-align: start;
    padding-left: 2rem;
    // background: $color-primary;
    color: $color-primary;
    font-size: $font-s;
    background: $color-grey--light;
  }
}
</style>
