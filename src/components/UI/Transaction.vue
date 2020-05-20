<template>
  <tr class="transaction" @mouseleave="showCtaList = false" :class="{'bg-mainColor--light': index % 2 !== 0}">
    <td class="transaction__date">
        <div>{{transaction.date | short-date}}</div>
    </td>
    <td class="transaction__name">
        <div>{{transactionName}}</div>
    </td>
    <td class="transaction__counterparty" v-if="!short">
        <div>{{transaction.counterparty}}</div>
    </td>
    <td class="transaction__wallet">
        <div>{{walletName}}</div>
    </td>
    <td class="transaction__details" v-if="!short">
        <div>{{transaction.details}}</div>
    </td>
    <td class="transaction__amount" :class="{expense: transaction.amount < 0, income: transaction.amount >= 0 }">
        <div>
          ${{transaction.amount | amount}}
        </div>
    </td>
    <td class="transaction__status" v-click-outside="closeCtaList">
        <div>{{transaction.status}}</div>
        <div class="transaction__cta" @click="showCtaList = !showCtaList"  @mouseenter="showCtaList = true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul
          class="transaction__cta__list"
          v-if="showCtaList"
          :class="{isLast: isLast }"
          :style="{boxShadow: theme.isDark ? '1px 5px 12px -1px rgba(15,15,15,1)' : '1px 5px 12px -1px rgb(165, 165, 165)'}"
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
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import { deleteTransactionQuery } from '@/graphQL/transactionsQuery'
export default {
  data () {
    return {
      walletName: '',
      showCtaList: false,
      isLast: false
    }
  },
  mounted () {
    const entries = Object.entries(this.walletsNameAndId)
    entries.forEach(entry => {
      if (entry[1].toString() === this.transaction.usedWalletId.toString()) {
        this.walletName = entry[0]
      }
    })
    if (this.index + 1 === this.lastIndex) {
      this.isLast = true
    }
  },
  methods: {
    ...mapMutations([
      'editTransaction',
      'openBackdrop'
    ]),
    closeCtaList () {
      this.showCtaList = false
    },
    edit () {
      this.openBackdrop('transactions')
      this.editTransaction(this.transaction)
    },
    deleteTransaction: async function () {
      const graphqlQuery = deleteTransactionQuery(this.transaction)
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.deleteTransaction
        this.$store.commit('deleteTransaction', resData)
      } catch (err) {
        console.log(err.response)
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters([
      'walletsNameAndId',
      'usersIncomesAndExpenses',
      'theme'
    ]),
    transactionName () {
      let res = ''
      for (const name in this.usersIncomesAndExpenses) {
        if (this.usersIncomesAndExpenses[name]._id === this.transaction.budgetId) {
          res = name
        }
      }
      return res
    }
  },
  props: {
    transaction: Object,
    short: Boolean,
    index: Number,
    lastIndex: Number
  }
}
</script>

<style lang="scss" scoped>
.transaction {
  &__date {
    width: 9%;
    // background: red;
  }
  &__name {
    width: 9%;
    // background: green;
  }
  &__counterparty {
    width: 12%;
    // background: brown;
  }
  &__wallet{
    width: 13%;
    // background: blue;
  }
  &__details {
    // background: green;
  }
  &__amount {
    width: 10%;
    // background: orange;
    &.expense {
      font-weight: bold;
    }
    &.income {
      color: var(--mainColor)
    }
  }
  &__status {
    width: 10%;
    position: relative;
    // background: salmon;
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
    &:hover {
      background: $color-grey--main;
      & span {
        background: $color-white;
      }
    }
    &__list {
      background: $color-white;
      // box-shadow: 1px 5px 12px -1px rgba(15,15,15,1);
      border-radius: .5rem;
      padding: 1rem 0;
      position: absolute;
      right: 0;
      top: 100%;
      list-style: none;
      width: 15rem;
      color: var(--textColor--dark);
      z-index: 3;
      &::after {
            content: "";
            position: absolute;
            top: -1.2rem;
            right: 12%;
            border-width: 6px;
            border-style: solid;
            border-color:  transparent transparent $color-white transparent ;
      }
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
td {
    height: 6rem;
    text-align: start;
    padding-left: 2rem;
    // border-top: 1px solid $color-line;;
    border-collapse: collapse;
    font-size: $font-s;
}
</style>
