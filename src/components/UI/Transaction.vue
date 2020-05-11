<template>
  <tr class="transaction">
    <td class="transaction__id" v-if="!short">
      <div>#{{ transaction.shortId}}</div>
    </td>
    <td class="transaction__date">
        <div>{{transaction.date | short-date}}</div>
    </td>
    <td class="transaction__name">
        <div>{{transaction.name}}</div>
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
        <div class="transaction__cta" @click="showCtaList = !showCtaList">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="transaction__cta__list" v-if="showCtaList">
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
      showCtaList: false
    }
  },
  mounted () {
    const entries = Object.entries(this.walletsNameAndId)
    entries.forEach(entry => {
      if (entry[1].toString() === this.transaction.usedWalletId.toString()) {
        this.walletName = entry[0]
      }
    })
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
      'walletsNameAndId'
    ])
  },
  props: {
    transaction: Object,
    short: Boolean
  }
}
</script>

<style lang="scss" scoped>
.transaction {
  &.bg-white {
    // background: var(--app-bg-secondary);
  }
  &.bg-blue {
    background: var(--on-surfaceColor);
  }
  &__id {
    // background: turquoise;
    width: 6%;
  }
  &__date {
    width: 9%;
    // background: red;
  }
  &__name {
    width: 10%;
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
      color: green
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
      width: 10rem;
      background: $color-white;
      position: absolute;
      list-style: none;
      top: 5rem;
      right: 0;
      z-index: 2;
      box-shadow: 0px 0px 13px 2px rgba(209,202,209,1);
      border-radius: .5rem;
      &__item {
        padding: 1rem;
        cursor: pointer;
        transition: all .3s ease-in;
        &:hover {
          background: $color-grey--dark;
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
