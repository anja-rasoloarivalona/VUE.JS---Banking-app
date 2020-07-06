<template>
    <div class="expense" :class="{'bg-white': theme.isLight, 'bg-surfaceColor': theme.isDark}">
        <expense-form isCancelBtnDisplayed>
            <div class="expense__header">
                <h1 v-text="editedExpense ? $t('editExpense') : $t('addExpense')"></h1>
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
      'theme',
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
  // padding: 2rem;
  // padding-bottom: 1rem;
  width: 39vw;
  // max-width: 60rem;
  border-radius: .5rem;
  // background: red !important;
  display: flex;
  flex-direction: column;
  align-items: center;
   &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 3rem;
        width: 52rem;
        & h1 {
          color: var(--textColor--dark)
        }
    }
}
</style>
