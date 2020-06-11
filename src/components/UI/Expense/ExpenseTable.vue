<template>
    <div class="expense-table">
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Type</th>
                    <th>Monthly average</th>
                </tr>
            </thead>
        </table>
        <div class="expense-table__scroll">
            <table>
                <tbody>
                    <expense-line-table v-for="expense in expenses" :key="expense._id" :expense="expense"></expense-line-table>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ExpenseLineTable from './ExpenseLineTable'
export default {
  components: {
    ExpenseLineTable
  },
  props: {
    expenses: {
      required: true,
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.expense-table {
    flex: 1;
    display: flex;
    flex-direction: column;
    &__scroll {
        max-height: 100%;
        flex: 1;
        min-height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }
    }
    table {
    width: 100%;
    border-bottom: 1px solid var(--lineColor);
    border-collapse: collapse;
    & th {
        height: 5rem;
        text-align: start;
        padding-left: 2rem;
        font-size: $font-s;
        width: calc(100% / 4);
        background: var(--backgroundColor);
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
