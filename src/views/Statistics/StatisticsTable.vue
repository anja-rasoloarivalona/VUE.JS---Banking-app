<template>
  <div class="statistics__content__table">
    <h1 class="statistics__content__table__title">{{$t('summary')}}</h1>
    <table>
      <thead>
        <tr>
          <th>{{$t('type')}}</th>
          <th>{{$t('category')}}</th>
          <th>{{$t('subcategory')}}</th>
          <th>{{$t('amount')}}</th>
          <th>{{$t('total')}}</th>
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

          <tr class="statistics__content__table__total" v-if="totalIncome > 0">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>{{$t('totalIncome')}}</td>
            <td>
                <span>{{ totalIncome | amount }}</span>
            </td>
          </tr>

          <tr v-for="(category, catKey, catIndex) in currentReport.expenseData" :key="catKey">
            <template v-if="catIndex === 0" >
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

          <tr class="statistics__content__table__total" v-if="totalExpense > 0">
             <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>{{$t('totalExpense')}}</td>
            <td>
                <span>{{ totalExpense | amount }}</span>
            </td>
          </tr>

          <tr class="statistics__content__table__total--savings" :class="{light: theme.isLight, dark: theme.isDark}">
             <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>{{$t('savings')}}</td>
            <td>{{ (totalIncome - totalExpense) | amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Expense from '@/components/UI/Expense/Expense'
import Income from '@/components/UI/Income/Income'
export default {
  computed: {
    ...mapGetters([
      'theme'
    ])
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

<style lang="scss">
.statistics__content__table__title {
    color: var(--textColor--dark);
    margin-bottom: 3rem;
}
.income-name__content {
  padding-left: 1rem !important;
}
</style>
