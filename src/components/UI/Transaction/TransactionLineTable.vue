<template>
    <tr class="transaction">
        <td class="transaction-table--date">
            <div>{{transaction.date | short-date | really-short-date }}</div>
        </td>

        <template v-if="transaction.transactionType === 'income'">
            <income  type="income" class="transaction-table--category"/>
            <income :income="{subcategory: transaction.subcategory}" type="subcategory" class="transaction-table--subcategory"/>
        </template>
        <template v-if="transaction.transactionType === 'expense'">
            <expense type="category" :categoryName="transaction.category" class="transaction-table--category"/>
            <expense type="subcategory" :categoryName="transaction.category" :subcategoryName="transaction.subcategory" class="transaction-table--subcategory"/>
        </template>

        <td class="transaction-table--counterparty">
            <div>{{ transaction.counterparty }}</div>
        </td>
        <td class="transaction-table--wallet">
            <div>{{ $t(walletData.type)}} - {{ walletData.name}}</div>
        </td>
        <td class="transaction-table--details">
            <div>{{ transaction.details }}</div>
        </td>
        <td class="transaction-table--amount">
            <div>{{ transaction.amount | amount }}</div>
        </td>
        <td class="transaction-table--status">
            <div>{{ $t(transaction.status) }}</div>
        </td>
    </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import Income from '@/components/UI/Income/Income'
import Expense from '@/components/UI/Expense/Expense'
export default {
  mounted () {
    console.log('wallet tyoe', this.user.walletTypeList)
  },
  computed: {
    ...mapGetters([
      'user',
      'incomesList',
      'expensesList'
    ]),
    walletData () {
      const data = {}
      this.user.wallets.forEach(wallet => {
        if (wallet._id === this.transaction.usedWalletId) {
          data.name = wallet.name
          this.user.walletTypeList.find(type => {
            if (type.value === wallet.walletType) {
              data.type = type.i18
              return true
            }
          })
        }
      })
      return data
    }
  },
  props: {
    transaction: Object
  },
  components: {
    Income,
    Expense
  }
}
</script>

<style lang="scss">
.transaction {
    td {
         height: 6rem;
        text-align: start;
        // padding-left: 1rem;
        border-collapse: collapse;
        font-size: $font-s;
    }
    & .income-name__content, & .expense-name__content {
        padding-left: 0rem !important;
    }
}

</style>
