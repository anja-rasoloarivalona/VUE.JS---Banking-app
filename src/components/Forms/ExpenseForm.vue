<template>
    <form class="form">
        <app-basic-input v-model="expense.name" id="name" />
        <app-basic-input v-model="expense.amount" id="amount"  />
        <app-basic-input v-model="expense.category" id="category" />
        <app-select-input v-model="expense.expenseType" id="Expense Type"  :options="['variable', 'fixed']"/>
        <app-basic-input v-model="expense.used" id="used"  v-if="expense.expenseType === 'variable'"/>
        <app-frequency-input v-model="expense.frequency" id="frequency" v-if="expense.expenseType === 'fixed'"
        />
        <!-- <app-frequency-input v-model="expense.frequency" :id="'frequency'"
                      @selectcounter="expense.frequency.counter = $event"
                      @selectPeriod="expense.frequency.period = $event"
                      v-if="expense.expenseType === 'fixed'"
        /> -->
        <app-date-input v-model="expense.lastPayout" id="last payout" v-if="expense.expenseType === 'fixed'"/>
        <div class="form__cta">
            <app-btn normal warning v-if="isCancelBtnDisplayed" @click.native="$emit('hideForm')">
                Cancel
            </app-btn>
            <app-btn normal primary @click.native="submit" >
                <span v-if="!loading" v-text="edited ? 'Edit' : 'Add'"></span>
                <app-spinner v-else></app-spinner>
            </app-btn>
        </div>
    </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      'secondaryColors',
      'currentAppStatus'
    ])
  },
  mounted () {
    if (this.edited) {
      this.expense = {
        ...this.expense,
        lastPayout: new Date(this.edited.lastPayout),
        autoWriting: this.edited.autoWriting ? 'yes' : 'no',
        notification: this.edited.notification ? 'yes' : 'no'
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
    submit: async function () {
      this.loading = true
      let result = false
      if (this.edited) {
        result = await this.editExpense(this.expense)
      } else {
        result = await this.addExpense(this.expense)
      }
      if (result) {
        this.loading = false
        if (this.currentAppStatus === 'active') {
          this.$router.push('budget')
        }
        this.$emit('hideForm')
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
.form {
    height: 100%;
    width: 100%;
    padding-bottom: 4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    row-gap: 1rem;
    & .input.frequency {
      grid-column: 1 / 3;
    }
    &__cta {
        height: 8rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
