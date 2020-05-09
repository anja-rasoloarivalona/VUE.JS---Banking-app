<template>
    <div class="transactions" :class="{'bg-surfaceColor': currentTheme.includes('light'), 'bg-on-surfaceColor': currentTheme.includes('dark') }">
        <transactions-form isCancelBtnDisplayed>
            <div class="transactions__header">
                <h1>Add transaction</h1>
                <div class="transactions__header__close">
                    <app-icon name="close" size="large" @click="closeBackdrop"/>
                </div>
            </div>
        </transactions-form>
    </div>
</template>

<script>
import TransactionsForm from '@/components/Forms/TransactionsForm'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentTheme'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ])
  },
  components: {
    TransactionsForm
  }
}
</script>

<style lang="scss" scoped>
.transactions {
    padding: 3rem;
    width: 50vw;
    border-radius: .5rem;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 3rem;
    }
}
</style>
