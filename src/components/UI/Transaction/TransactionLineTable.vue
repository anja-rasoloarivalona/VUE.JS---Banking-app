<template>
    <tr class="transaction"  @mouseleave="closeList" :class="{short: short, light: theme.isLight, dark: theme.isDark}">
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

        <td class="transaction-table--counterparty" v-if="!short">
            <div>{{ transaction.counterparty }}</div>
        </td>
        <td class="transaction-table--wallet" v-if="!short">
            <div>{{ $t(walletData.type)}} - {{ walletData.name}}</div>
        </td>
        <td class="transaction-table--details" v-if="!short">
            <div>{{ transaction.details }}</div>
        </td>
        <td class="transaction-table--amount">
            <div>{{ transaction.amount | amount }}</div>
        </td>
        <td class="transaction-table--status" v-click-outside="closeList" v-if="!short">
            <div>{{ $t(transaction.status) }}</div>
            <div class="transaction__cta"  @mouseenter="showList = true">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul
            class="transaction__cta__list"
            v-if="showList"
            :class="{isLast: isLast }"
            >
            <li class="transaction__cta__list__item" @click="edit">
                {{$t('edit')}}
            </li>
            <li class="transaction__cta__list__item" @click="deleteTransaction(transaction._id)">
                {{$t('delete')}}
            </li>
            </ul>
        </td>
    </tr>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Income from '@/components/UI/Income/Income'
import Expense from '@/components/UI/Expense/Expense'
export default {
  data () {
    return {
      showList: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'incomesList',
      'expensesList',
      'theme'
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
  methods: {
    ...mapMutations([
      'editTransaction',
      'openBackdrop'
    ]),
    ...mapActions([
      'deleteTransaction'
    ]),
    closeList () {
      this.showList = false
    },
    edit () {
      this.editTransaction(this.transaction)
      this.openBackdrop('transactions')
    }
  },
  props: {
    transaction: Object,
    isLast: Boolean,
    short: Boolean
  },
  components: {
    Income,
    Expense
  }
}
</script>

<style lang="scss">
.transaction-table--status {
    position: relative;
}
.transaction {
    &.light:hover {
        background: var(--mainColor--light);
    }
    &.dark:hover {
      background: var(--mainColor--dark);
    }

    td {
        height: 6rem;
        text-align: start;
        border-collapse: collapse;
        font-size: $font-s;
        border-bottom: 1px solid var(--lineColor);
    }
    &.short {
      & .income-name__content, & .expense-name__content, & td {
        padding-left: 1rem;
    }
    }
    & .income-name__content, & .expense-name__content {
        padding-left: 0rem;
    }
     &__cta {
        position: absolute;
        right: 1rem;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 3rem;
        height:3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all .3s ease-in;
        cursor: pointer;
        background: transparent;
        & span {
            width: 3px;
            height: 3px;
            background: $color-grey--main;
            border-radius: 50%;
            margin: 1px;
            transition: all .3s ease-in;
        }
        &__list {
            background: $color-white;
            border-radius: .5rem;
            padding: 1rem 0;
            position: absolute;
            right: 1rem;
            top: 80%;
            list-style: none;
            width: 15rem;
            color: var(--textColor--dark);
            box-shadow: var(--boxShadow);
            z-index: 3;
            &.isLast {
                top: -145%;
                &::after {
                    bottom: -1.2rem;
                    top: unset;
                    border-color: $color-white transparent transparent transparent  ;
                }
                }
            &__item {
                padding: 1rem 0;
                cursor: pointer;
                padding-left: 1rem;
                &:hover {
                background: var(--mainColor);
                color: $color-white
                }
            }
        }
  }
}

</style>
