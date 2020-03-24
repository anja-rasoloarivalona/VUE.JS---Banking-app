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
    <td class="transaction__amount">
        <div>${{parseInt(transaction.amount) | amount}}</div>
    </td>
    <td class="transaction__status">
        <div>{{transaction.status}}</div>
        <div class="transaction__cta">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="transaction__cta__list">
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
    // background: blue;
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
