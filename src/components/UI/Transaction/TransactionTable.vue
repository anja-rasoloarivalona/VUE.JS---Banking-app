<template>
    <div class="transaction-table">
        <table>
            <thead>
                <tr>
                    <th class="transaction-table--date">Date</th>
                    <th class="transaction-table--category">Category</th>
                    <th class="transaction-table--subcategory">Subcategory</th>
                    <th class="transaction-table--counterparty">Counterparty</th>
                    <th class="transaction-table--wallet">Used wallet</th>
                    <th class="transaction-table--details">Details</th>
                    <th class="transaction-table--amount">Amount</th>
                    <th class="transaction-table--status">Status</th>
                </tr>
            </thead>
        </table>
        <div class="transaction-table__scroll">
            <table>
                <tbody>
                    <transaction-line-table v-for="transaction in transactions" :key="transaction._id" :transaction="transaction"/>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TransactionLineTable from './TransactionLineTable'
export default {
  components: {
    TransactionLineTable
  },
  props: {
    transactions: Array
  }
}
</script>

<style lang="scss">
.transaction-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    &--date {
        // background: red;
        width: 5%;
    }
    &--category {
        // background: green;
        width: 12.5%;
    }
    &--subcategory {
        // background: salmon;
        width: 12.5%;
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
        width: 23%;
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
        max-height: 100%;
        min-height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }
    }
    & table {
    width: 100%;
    border-bottom: 1px solid var(--lineColor);
    border-collapse: collapse;
        & th {
            height: 5rem;
            text-align: start;
            // padding-left: 1rem;
            font-size: $font-s;
            // background: var(--backgroundColor);
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
