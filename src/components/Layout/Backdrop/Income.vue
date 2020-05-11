<template>
    <div class="income" :class="{'bg-surfaceColor': currentTheme.includes('light'), 'bg-surfaceColor': currentTheme.includes('dark') }">
        <income-form isCancelBtnDisplayed>
            <div class="income__header">
                <h1 v-text="editedIncome ? 'Edit income' : 'Add income'"></h1>
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
      'currentTheme',
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
