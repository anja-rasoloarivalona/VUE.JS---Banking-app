<template>
    <div class="setup-table expense-table">
        <table>
            <thead>
                <tr>
                    <th>{{$t('category')}}</th>
                    <th>{{$t('subcategory')}}</th>
                    <th>{{$t('type')}}</th>
                    <th>{{$t('monthlyAverage')}}</th>
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
    // background: salmon;
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
