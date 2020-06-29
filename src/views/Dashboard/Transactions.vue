<template>
    <div class="transactions dashboard__section">
            <h2 class="dashboard__section__title">Recent transactions</h2>

            <table class="transactions__table">
                <thead>
                  <tr>
                    <th class="transactions__table__date">{{$t('date')}}</th>
                    <th class="transactions__table__category">{{$t('category')}}</th>
                    <th class="transactions__table__subcategory">{{$t('subcategory')}}</th>
                    <th class="transactions__table__amount">{{$t('amount')}}</th>
                  </tr>
                </thead>
                <div class="transactions__table--empty" v-if="userTransactions.length === 0">
                    You do not have transactions yet. <div @click="openBackdrop('transactions')">Click here</div> to add one
                </div>
                <tbody v-else>
                  <transaction-line-table
                    :short="true"
                    v-for="(transaction, index) in displayedTransactions"
                    :key="transaction._id"
                    :index="index"
                    :transaction="transaction"
                  />
                </tbody>
            </table>
        </div>
</template>

<script>
import TransactionLineTable from '@/components/UI/Transaction/TransactionLineTable'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userTransactions'
    ]),
    displayedTransactions () {
      return this.userTransactions.slice(0, 3)
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
    ])
  },
  components: {
    TransactionLineTable
  }
}
</script>

<style lang="scss" scoped>
.transactions {
    height: 31.1rem;
    display: flex;
    flex-direction: column;
    & h2 {
      margin-top: 1rem;
      margin-bottom: 2rem;
    }
    &__table {
      &__date {
         width: 7%;
      }
      &__category {
        width: 14%;
      }
      &__subcategory {
        width: 14%;
        padding-left: 1rem !important;
      }
      &__amount {
        width: 7%;
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
    padding-left: 1rem;
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
