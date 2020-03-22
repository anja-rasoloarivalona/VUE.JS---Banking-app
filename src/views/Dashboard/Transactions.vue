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
                  v-for="transaction in transactions"
                  :key="transaction.shortId"
                  :transaction="transaction"
                ></app-transaction>
              </tbody>
            </table>
        </div>
</template>

<script>
import Transaction from '@/components/UI/Transaction'
export default {
  data () {
    return {
      transactions: [
        {
          shortId: 123,
          date: '2 Nov 2019',
          counterparty: 'Pierre',
          details: 'November rent',
          usedWallet: 'Debit Desjardins',
          amount: 300,
          status: 'paid'
        },
        {
          shortId: 423,
          date: '2 Nov 2019',
          counterparty: 'Pierre',
          details: 'November rent',
          usedWallet: 'Debit Desjardins',
          amount: 300,
          status: 'paid'
        }
      ]
    }
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
