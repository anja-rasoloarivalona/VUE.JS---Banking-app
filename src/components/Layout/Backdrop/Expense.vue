<template>
    <div class="expense" :class="{'bg-surfaceColor': currentTheme.includes('light'), 'bg-surfaceColor': currentTheme.includes('dark') }">
        <expense-form isCancelBtnDisplayed>
            <div class="expense__header">
                <h1 v-text="editedExpense ? 'Edit expense' : 'Add expense'"></h1>
                <div class="expense__header__close" @click="closeBackdrop">
                    <app-icon name="close" size="large"/>
                </div>
            </div>
        </expense-form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ExpenseForm from '@/components/Forms/ExpenseForm'
export default {
  components: {
    ExpenseForm
  },
  computed: {
    ...mapGetters([
      'currentTheme',
      'editedExpense'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ])
  }
}
</script>

<style lang="scss" scoped>
.expense {
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
