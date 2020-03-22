<template>
  <tr class="transaction">
    <td>
      <div class="transaction__id">{{ transaction.shortId}}</div>
    </td>
    <td>
        <div>{{transaction.date}}</div>
    </td>
    <td>
        <div>{{transaction.counterparty}}</div>
    </td>
    <td>
        <div>{{transaction.details}}</div>
    </td>
    <td>
        <div>{{transaction.usedWallet}}</div>
    </td>
    <td>
        <div>{{transaction.amount | amount}}</div>
    </td>
    <td>
        <div>{{transaction.status}}</div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    transaction: Object
  }
}
</script>

<style lang="scss" scoped>
td {
    height: 6rem;
    text-align: center;
    // border-top: 1px solid $color-line;;
    border-collapse: collapse;
    font-size: $font-s;
}
</style>
