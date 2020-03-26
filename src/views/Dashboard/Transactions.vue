<template>
    <div class="transactions">
            <h2 class="dashboard__section__title">Recent transactions</h2>
            <table class="transactions__table">
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Counterparty</th>
                    <th>Details</th>
                    <th>Used wallet</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
              </thead>
              <tbody>
                <app-transaction
                  v-for="transaction in userTransactions"
                  :key="transaction.shortId"
                  :transaction="transaction"
                ></app-transaction>
              </tbody>
            </table>
        </div>
</template>

<script>
import Transaction from '@/components/UI/Transaction'
import { mapGetters } from 'vuex'
export default {
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
    padding: 1rem;
    height: 23.1rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    & h2 {
        margin-bottom: 1rem;
    }
}
table, table th {
  border-top: 1px solid $color-line;
  border-bottom: 1px solid $color-line;
  border-collapse: collapse;
}
table {
  width: 100%;
  & th {
    height: 5rem;
    text-align: center;
    background: $color-grey--light;
    font-size: $font-s;
  }
}
</style>
