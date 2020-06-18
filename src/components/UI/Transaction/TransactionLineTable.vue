<template>
    <tr class="transaction"  @mouseleave="closeList">
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
        <td class="transaction-table--status" v-click-outside="closeList">
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
                Edit
            </li>
            <li class="transaction__cta__list__item" @click="deleteTransaction">
                Delete
            </li>
            </ul>
        </td>
    </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import Income from '@/components/UI/Income/Income'
import Expense from '@/components/UI/Expense/Expense'
export default {
  data () {
    return {
      showList: false
    }
  },
  mounted () {
    if (this.isLast) {
      console.log('tes')
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
    closeList () {
      this.showList = false
    }
  },
  props: {
    transaction: Object,
    isLast: Boolean
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
    &:hover {
        background: var(--mainColor--light);
    }
    td {
         height: 6rem;
        text-align: start;
        // padding-left: 1rem;
        border-collapse: collapse;
        font-size: $font-s;
        border-bottom: 1px solid var(--lineColor);
    }
    & .income-name__content, & .expense-name__content {
        padding-left: 0rem !important;
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
        // &:hover {
        // background: $color-grey--main;
        //     & span {
        //         background: $color-white;
        //     }
        // }
        &__list {
            background: $color-white;
            // box-shadow: 1px 5px 12px -1px rgba(15,15,15,1);
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
