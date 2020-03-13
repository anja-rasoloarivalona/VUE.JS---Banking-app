<template>
    <div class="walletForm">
        <form>
            Hello
        </form>
        <div class="walletForm__preview">

        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      walletInput: {
        type: '',
        amount: 0,
        supplier: '',
        shortId: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.walletForm {
    margin-top: 4rem;
    width: 100%;
    background: red;
}
</style>
