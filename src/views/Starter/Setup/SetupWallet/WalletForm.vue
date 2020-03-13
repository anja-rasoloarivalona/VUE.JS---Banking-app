<template>
    <div class="walletForm">
        <form>
            <select-input :options="cardType"/>
        </form>
        <div class="walletForm__preview">

        </div>
    </div>
</template>

<script>
import SelectInput from '@/components/SelectInput.vue'
export default {
  data () {
    return {
      walletInput: {
        type: '',
        amount: 0,
        supplier: '',
        shortId: ''
      },
      cardType: ['Visa', 'MasterCard', 'Debit', 'Cash']
    }
  },
  components: {
    'select-input': SelectInput
  }
}
</script>

<style lang="scss" scoped>
.walletForm {
    margin-top: 4rem;
    width: 100%;
}
</style>
