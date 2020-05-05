<template>
    <div class="budget">
        <div class="budget__section"
            v-if="!selected || selectedType === 'income'"
            :class="{'app-bg-primary': showForm}"
        >
            <h2 class="budget__section__title">Incomes</h2>
            <budget-form
                v-if="showForm && selectedType === 'income'"
                :type="selectedType"
                :selected="selected"
                @closeForm="closeForm"
            >
            </budget-form>
            <ul class="budget__section__list" v-if="!showForm">
                <app-income
                    v-for="income in this.$store.state.user.incomes"
                    :key="income._id"
                    :income="income"
                    @click.native="selectItem('income', income)"
                >
                </app-income>
            </ul>
        </div>
        <div class="budget__section"
            v-if="!selected || selectedType === 'expense'"
            :class="{'app-bg-primary': showForm}"
        >
            <h2 class="budget__section__title">Expenses</h2>
            <budget-form
                v-if="showForm && selectedType === 'expense'"
                :type="selectedType"
                :selected="selected"
                @closeForm="closeForm"
            >
            </budget-form>
            <ul class="budget__section__list" v-if="!showForm">
                <app-expense
                    v-for="expense in this.$store.state.user.expenses"
                    :key="expense._id"
                    :expense="expense"
                    @click.native="selectItem('expense', expense)"
                >
                </app-expense>
            </ul>
        </div>
    </div>
</template>

<script>
import BudgetForm from '@/components/Forms/BudgetForm'
import Income from '@/components/UI/Income'
import Expense from '@/components/UI/Expense'
export default {
  data () {
    return {
      showForm: false,
      selected: null,
      selectedType: null
    }
  },
  methods: {
    selectItem (type, item) {
      this.selected = item
      this.selectedType = type
      this.showForm = true
    },
    closeForm () {
      this.selected = false
      this.selectedType = null
      this.showForm = null
    }
  },
  components: {
    'app-income': Income,
    'app-expense': Expense,
    'budget-form': BudgetForm
  }
}
</script>

<style lang="scss" scoped>
.budget {
    width: 100%;
  max-width: 120rem;
    &__section {
        background: var(--app-item-bg);
        padding: 1rem;
        padding-left: 3rem;
        padding-bottom: 2rem;
        border-radius: .5rem;
        margin-bottom: 3rem;
        transition: all .2 ease-in;
        &.app-bg-primary {
            background: var(--app-bg-primary);
        }
        &__title {
            height: 3rem;
            display: flex;
            align-items: center;
            color: var(--app-text-color);
            margin-bottom: 2rem;
        }
        &__list {
            & .income {

            }
        }
    }
}
</style>
