<template>
    <div class="income" :class="{'bg-white': theme.isLight, 'bg-surfaceColor': theme.isDark}">
        <income-form isCancelBtnDisplayed>
            <div class="income__header">
                <h1 v-text="editedIncome ? $t('editIncome') : $t('addIncome')"></h1>
                <div class="income__header__close" @click="closeBackdrop">
                  <app-icon name="close" size="large"/>
                </div>
            </div>
        </income-form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import IncomeForm from '@/components/Forms/IncomeForm'
export default {
  components: {
    IncomeForm
  },
  computed: {
    ...mapGetters([
      'theme',
      'editedIncome'
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
.income {
  padding: 3rem;
  width: 39vw;
  border-radius: .5rem;
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
