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
            <div class="transactions__table--empty" v-if="userTransactions.length === 0">
                You do not have transactions yet. <div @click="openBackdrop('transactions')">Click here</div> to add one
            </div>
            <div class="scroll" v-else>
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userTransactions'
    ])
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
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
    height: 31.1rem;
    display: flex;
    flex-direction: column;
    & h2 {
      margin-bottom: 2rem;
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
    &__table--empty {
      width: 100%;
      height: 100%;
      // background: red;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-s;
      & div {
        margin: 0 .35rem;
        cursor: pointer;
        color: var(--mainColor);
        &:hover {
          text-decoration: underline;
        }
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
