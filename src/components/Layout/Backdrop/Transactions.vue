<template>
    <div class="transactions" :class="{'bg-surfaceColor': theme.isLight, 'bg-surfaceColor': theme.isDark}">
        <transactions-form isCancelBtnDisplayed>
            <div class="transactions__header">
                <h1 v-text="isEditingTransaction ? 'Edit Transaction' : 'Add Transaction'">Add transaction</h1>
                <div class="transactions__header__close">
                    <app-icon name="close" size="large" @click="close"/>
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
      'theme',
      'isEditingTransaction'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop',
      'resetEditTransaction'
    ]),
    close () {
      this.closeBackdrop()
      this.resetEditTransaction()
    }
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
        & h1 {
          color: var(--textColor--dark)
        }
    }
}
</style>
