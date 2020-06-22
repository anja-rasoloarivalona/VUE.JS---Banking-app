<template>
  <div class="statistics__content__table">
    <h1 class="statistics__content__table__title">Summary</h1>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
    </table>
    <div class="statistics__content__table__scroll">
      <table>
        <tbody>

          <tr v-for="(detail, index) in currentReport.incomeData" :key="detail.Category" :class="{lastIncome: index === currentReport.incomeData.length - 1, notLastIncome: index !== currentReport.incomeData.length - 1 }">
            <template v-if="index === 0">
              <td :rowspan="currentReport.incomeData.length" :colspan="2" class="statistics__content__table__type">
                <div>{{ $t("income") }}</div>
              </td>
              <income type="subcategory" :income="{ subcategory: detail.subcategory }" />
              <td>{{ detail.amount | amount }}</td>
              <td :rowspan="currentReport.incomeData.length" class="statistics__content__table__income__value">
                {{ totalIncome | amount }}
              </td>
            </template>
            <template v-else>
              <income type="subcategory" :income="{ subcategory: detail.subcategory }"/>
              <td>{{ detail.amount | amount }}</td>
            </template>
          </tr>

          <tr class="statistics__content__table__total">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Total Income</td>
            <td>
                <span v-if="totalIncome !== 0">{{ totalIncome | amount }}</span>
                <span v-else>-</span>
            </td>
          </tr>

          <tr v-for="(category, catKey, catIndex) in currentReport.expenseData" :key="catKey">
            <template v-if="catIndex === 0">
              <td :rowspan="Object.keys(currentReport.expenseData).length" class="statistics__content__table__type">
                <div>{{ $t("expense") }}</div>
              </td>
              <expense type="category" :categoryName="catKey" />
              <table
                v-for="(subcategory, subcatKey) in category.subcategories"
                :key="subcatKey"
                class="statistics__content__table__nested-table"
              >
                <tr>
                  <expense type="subcategory" :categoryName="catKey" :subcategoryName="subcatKey" />
                  <td>{{ subcategory | amount }}</td>
                </tr>
              </table>
              <td>&nbsp;</td>
              <td>{{ category.total | amount }}</td>
            </template>

            <template v-else>
              <expense type="category" :categoryName="catKey" />
              <table
                v-for="(subcategory, subcatKey) in category.subcategories"
                :key="subcatKey"
                class="statistics__content__table__nested-table"
              >
                <tr>
                  <expense
                    type="subcategory"
                    :categoryName="catKey"
                    :subcategoryName="subcatKey"
                  />
                  <td>{{ subcategory | amount }}</td>
                </tr>
              </table>
              <td>&nbsp;</td>
              <td>{{ category.total | amount }}</td>
            </template>
          </tr>

          <tr class="statistics__content__table__total">
             <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Total Expense</td>
            <td>
                <span v-if="totalExpense !== 0">{{ totalExpense | amount }}</span>
                <span v-else>-</span>
            </td>
          </tr>

          <tr class="statistics__content__table__total--savings">
             <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Savings</td>
            <td>{{ (totalIncome - totalExpense) | amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Expense from '@/components/UI/Expense/Expense'
import Income from '@/components/UI/Income/Income'
export default {
  mounted () {
    console.log('current', this.currentReport)
  },
  props: {
    currentReport: Object,
    totalIncome: Number,
    totalExpense: Number
  },
  components: {
    Expense,
    Income
  }
}
</script>

<style lang="scss" scoped>
.statistics__content__table__title {
    color: var(--textColor--dark);
    margin-bottom: 3rem;
}
</style>
