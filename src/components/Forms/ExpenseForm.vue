<template>
    <div class="expense-form">
    <slot />
    <form>
        <app-basic-input v-model="expense.name" id="name" />
        <app-basic-input v-model="expense.amount" id="amount"  />
        <app-basic-input v-model="expense.category" id="category" />
        <app-select-input v-model="expense.expenseType" id="Expense Type"  :options="['variable', 'fixed']"/>
        <app-basic-input v-model="expense.used" id="used"  v-if="expense.expenseType === 'variable'"/>
        <app-frequency-input v-model="expense.frequency" id="frequency" v-if="expense.expenseType === 'fixed'"/>
        <app-date-input v-model="expense.lastPayout" id="last payout" v-if="expense.expenseType === 'fixed'"/>
    </form>
    <div class="expense-form__cta">
            <app-btn normal warning v-if="isCancelBtnDisplayed" @click.native="$emit('hideForm')">
                Cancel
            </app-btn>
            <app-btn normal primary @click.native="submit" >
                <span v-if="!loading" v-text="editedExpense ? 'Edit' : 'Add'"></span>
                <app-spinner v-else></app-spinner>
            </app-btn>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      expense: {
        name: '',
        amount: 0,
        category: '',
        used: 0,
        expenseType: 'variable',
        lastPayout: new Date(),
        frequency: {
          counter: 'once',
          period: 'a day'
        },
        color: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'editedExpense',
      'secondaryColors'
    ])
  },
  mounted () {
    if (this.editedExpense) {
      this.expense = {
        ...this.editedExpense,
        lastPayout: new Date(this.editedExpense.lastPayout),
        autoWriting: this.editedExpense.autoWriting ? 'yes' : 'no',
        notification: this.editedExpense.notification ? 'yes' : 'no'
      }
    } else {
      this.expense.color = this.secondaryColors[this.user.expenses.length]
    }
  },
  methods: {
    ...mapActions([
      'addExpense',
      'editExpense'
    ]),
    ...mapMutations([
      'closeBackdrop'
    ]),
    close () {
      this.closeBackdrop()
      this.$emit('hideForm')
    },
    submit: async function () {
      this.loading = true
      let result = false
      if (this.editedExpense) {
        result = await this.editExpense(this.expense)
      } else {
        result = await this.addExpense(this.expense)
      }
      if (result) {
        this.loading = false
        this.close()
      } else {
        this.loading = false
      }
    }
  },
  props: {
    edited: Object,
    isCancelBtnDisplayed: Boolean
  }
}
</script>

<style lang="scss" scoped>
.expense-form {
  & form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: max-content;
      grid-auto-rows: max-content;
      column-gap: 2rem;
      row-gap: 1rem;
      & .input.frequency {
        grid-column: 1 / 3;
      }
  }
  &__cta {
      display: flex;
      justify-content: center;
      // position: relative;
      // z-index: 10;
  }
}
</style>
