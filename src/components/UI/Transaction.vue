<template>
  <tr class="transaction">
    <td class="transaction__id">
      <div>#{{ transaction.shortId}}</div>
    </td>
    <td class="transaction__date">
        <div>{{transaction.date | short-date}}</div>
    </td>
    <td class="transaction__counterparty">
        <div>{{transaction.counterparty}}</div>
    </td>
    <td class="transaction__wallet">
        <div>{{walletName}}</div>
    </td>
    <td class="transaction__details">
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
          <li class="transaction__cta__list__item">
              Edit
          </li>
          <li class="transaction__cta__list__item">
              Delete
          </li>
        </ul>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      walletName: '',
      showCtaList: false
    }
  },
  methods: {
    closeCtaList () {
      this.showCtaList = false
    }
  },
  computed: {
    ...mapGetters([
      'walletsNameAndId'
    ])
  },
  props: {
    transaction: Object
  },
  mounted () {
    const entries = Object.entries(this.walletsNameAndId)
    entries.forEach(entry => {
      if (entry[1].toString() === this.transaction.usedWallet.toString()) {
        this.walletName = entry[0]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.transaction {
  &.bg-blue {
    background: rgb(231, 241, 248);
  }
  &__id {
    // background: turquoise;
    width: 8%;
  }
  &__date {
    // background: violet;
  }
  &__details {
    width: 24%;
    // background: green;
  }
  &__amount {
    width: 13%;
    &.expense {
      font-weight: bold;
    }
    &.income {
      color: green
    }
  }
  &__status {
    width: 16%;
    position: relative;
    // background: red;
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
