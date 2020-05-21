<template>
    <div class="transactions dashboard__section">
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
                    :index="index"
                    :transaction="transaction"
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
  max-height: 18.1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
}
.transactions {
    padding: 1rem;
    padding-left: 3rem;
    height: 31.1rem;
    & h2 {
        margin-bottom: 1rem;
    }
    &__table {
      &__date {
         width: 10.5%;
      }
      &__name {
        width: 10%;
      }
      &__wallet {
        width: 13%;
      }
      &__amount {
        width: 10%;
      }
      &__status {
        width: 10%;
      }
    }
}
table, table th {
  border-bottom: 1px solid var(--on-surfaceColor);
  border-collapse: collapse;
}
table {
  width: 100%;
  & th {
    height: 5rem;
    text-align: start;
    padding-left: 2rem;
    font-size: $font-s;
    background: var(--mainColor);
    // background: $color-grey--main;
    color: $color-white;
  }
  th:first-child {
    border-radius: 6px 0 0 0;
  }

  th:last-child {
    border-radius: 0 6px 0 0;
  }

  th:only-child{
    border-radius: 6px 6px 0 0;
  }
}

</style>
