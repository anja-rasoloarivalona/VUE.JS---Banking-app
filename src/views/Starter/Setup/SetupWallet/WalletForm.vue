<template>
    <div class="walletForm">
        <form class="form">
                <app-select-input :id="'type'"  :options="cardType" @selectInput="walletInput.type = $event"/>
                <app-input v-model="walletInput.supplier" :id="'supplier'"/>
                <app-input v-model="walletInput.amount" :id="'amount'"/>
                <app-input v-model="walletInput.shortId" :id="'Last  4 numbers'"/>
        </form>
        <div class="walletForm__preview">
          yo
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      walletInput: {
        type: 'Visa',
        amount: 0,
        supplier: '',
        shortId: ''
      },
      cardType: ['Visa', 'MasterCard', 'Debit', 'Cash']
    }
  }
}
</script>

<style lang="scss" scoped>
.walletForm {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    background: $color-grey--light;

    & .form {
      width: 30%;
      background: red;
      padding: 1rem;
    }

    &__preview {
      width: 100%;
      // background: yellow;
    }
}
</style>
