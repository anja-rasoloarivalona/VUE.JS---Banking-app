<template>
    <div class="transaction-table">
        <table :class="{light: theme.isLight}">
            <thead>
                <tr>
                    <th class="transaction-table--date">{{$t('date')}}</th>
                    <th class="transaction-table--category">{{$t('category')}}</th>
                    <th class="transaction-table--subcategory">{{$t('subcategory')}}</th>
                    <th class="transaction-table--counterparty">{{$t('counterparty')}}</th>
                    <th class="transaction-table--wallet">{{$t('usedWallet')}}</th>
                    <th class="transaction-table--details">{{$t('details')}}</th>
                    <th class="transaction-table--amount">{{$t('amount')}}</th>
                    <th class="transaction-table--status">{{$t('status')}}</th>
                </tr>
            </thead>
        </table>
        <div class="transaction-table__scroll">
            <table>
                <tbody>
                    <transaction-line-table
                        v-for="(transaction, index) in transactionsData"
                        :key="transaction._id"
                        :transaction="transaction"
                        :isLast="index > transactionsData.length - 3 && index > 4 && index !== 0"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TransactionLineTable from './TransactionLineTable'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      transactionsData: []
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ])
  },
  components: {
    TransactionLineTable
  },
  watch: {
    sort: function (sortValue) {
      if (sortValue === 'decrease') {
        this.transactionsData = this.transactionsData.sort((a, b) => (
          new Date(a.date) > new Date(b.date) ? -1 : 1
        ))
      } else {
        this.transactionsData = this.transactionsData.sort((a, b) => (
          new Date(a.date) > new Date(b.date) ? 1 : -1
        ))
      }
    },
    transactions: {
      immediate: true,
      deep: true,
      handler: 'loadData'
    }
  },
  methods: {
    loadData (data) {
      this.transactionsData = data
    }
  },
  props: {
    transactions: Array,
    sort: String
  }
}
</script>

<style lang="scss">
.transaction-table {
    // background: brown;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    &--date {
        // background: red;
        padding-left: 1rem;
        width: 7%;
    }
    &--category {
        // background: green;
        width: 14%;
    }
    &--subcategory {
        // background: salmon;
        width: 14%;
    }
    &--counterparty {
        // background: blue;
        width: 10%;
    }
    &--wallet {
        // background: violet;
        width: 12%;
    }
    &--details {
        // background: orange;
        width: 20%;
    }
    &--amount {
        // background: brown;
        width: 7%;
    }
    &--status {
        // background: seagreen;
        width: 7%;
    }
    &__scroll {
        flex-grow: 1;
        // background: blue;
        overflow: auto;
        height: 10rem;
        // display: flex;
        &::-webkit-scrollbar{
            display: none;
        }
    }
    & table {
    width: 100%;
    border-collapse: collapse;
    &.light th {
        background: var(--backgroundColor);
    }
        & thead {
            // background: green;
        }
        & th {
            height: 5rem;
            text-align: start;
            border-bottom: 1px solid var(--lineColor);
            font-size: $font-s;
            color: var(--textColor--dark);
                &:first-child {
                    border-radius: 6px 0 0 0;
                }
                &:last-child {
                    border-radius: 0 6px 0 0;
                }
                &:only-child {
                    border-radius: 6px 6px 0 0;
                }
            }
    }
}
</style>
