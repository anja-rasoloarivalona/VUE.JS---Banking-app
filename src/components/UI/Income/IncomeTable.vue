<template>
    <div class="income-table">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Frequency</th>
                    <th>Amount / transaction</th>
                    <th>Monthly average</th>
                </tr>
            </thead>
        </table>
        <div class="income-table__scroll">
            <table>
                <tbody>
                    <income-line-table v-for="income in incomes" :key="income._id" :income="income"></income-line-table>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import IncomeLineTable from './IncomeLineTable'
export default {
  components: {
    IncomeLineTable
  },
  props: {
    incomes: {
      required: true,
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.income-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    &__scroll {
        max-height: 100%;
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
