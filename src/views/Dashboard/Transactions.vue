<template>
    <div class="transactions">
            <h2 class="dashboard__section__title">Recent transactions</h2>

            <table class="transactions__table">
                <thead>
                  <tr>
                    <th class="transactions__table__date">Date</th>
                    <th class="transactions__table__name">Name</th>
                    <th class="transactions__table__wallet">Used wallet</th>
                    <th class="transactions__table__amount">Amount</th>
                    <th class="transactions__table__status">Status</th>
                  </tr>
                </thead>
            </table>
            <div class="scroll">
              <table class="transactions__table">
                <tbody>
                  <app-transaction
                    :short="true"
                    v-for="(transaction, index) in userTransactions"
                    :key="transaction._id"
                    :transaction="transaction"
                    :class="{'bg-white': index % 2 === 0, 'bg-blue': index % 2 !== 0 }"
                  ></app-transaction>
                </tbody>
              </table>
            </div>
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
.scroll {
  max-height: 12rem;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
}
.transactions {
    background: $color-white;
    padding: 1rem;
    height: 23.1rem;
    // overflow: hidden;
    & h2 {
        margin-bottom: 1rem;
    }
    &__table {
      &__date {
         width: 10.5%;
          // background: red;
      }
      &__name {
        width: 10%;
          // background: green;
      }
      &__wallet {
        width: 13%;
          // background: blue;
      }
      &__amount {
        width: 10%;
          // background: orange;
      }
      &__status {
        width: 10%;
          // background: salmon;
      }
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
    text-align: start;
    padding-left: 2rem;
    background: $color-grey--light;
    font-size: $font-s;
  }
}

</style>
