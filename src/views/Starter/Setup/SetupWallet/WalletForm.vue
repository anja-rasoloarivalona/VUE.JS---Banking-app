<template>
    <div class="walletForm">
        <form class="form">
                <app-select-input :id="'type'"  :options="cardType" @selectInput="walletInput.type = $event" bgWhite/>
                <app-input v-model="walletInput.supplier" :id="'supplier'" bgWhite/>
                <app-input v-model="walletInput.amount" :id="'amount'" bgWhite/>
                <app-input v-model="walletInput.shortId" :id="'Last  4 numbers'" bgWhite/>
        </form>
        <div class="walletForm__preview">
          <app-card :card="walletInput"></app-card>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card'
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
  },
  components: {
    'app-card': Card
  }
}
</script>

<style lang="scss" scoped>
.walletForm {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    background: $color-grey--light;
    border-radius: .5rem;

    & .form {
      width: 30%;
      padding: 2rem;
    }

    &__preview {
      width: 100%;
      background: yellow;
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
</style>
