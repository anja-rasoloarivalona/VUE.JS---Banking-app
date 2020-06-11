<template>
  <div class="income-form">
      <slot />
      <form>
          <app-basic-input v-model="income.name" id="Name"/>
          <app-basic-input v-model="income.amount" id="Amount" />
          <app-date-input v-model="income.lastPayout" id="Last payout" />
          <app-basic-input v-model="income.from" id="From" />
          <app-select-input v-model="income.autoWriting" id="Auto writing" :options="['yes', 'no']" />
          <app-select-input v-model="income.notification" id="Notification" :options="['yes', 'no']" />
          <app-frequency-input v-model="income.frequency" id="Frequency"/>
      </form>
      <div class="income-form__cta">
            <app-btn normal secondary v-if="isCancelBtnDisplayed" @click.native="close">
                Cancel
            </app-btn>
            <app-btn normal primary @click.native="submit" >
                    <div v-if="!loading" v-text="editedIncome ? 'Edit' : 'Add'"></div>
                    <app-spinner v-else></app-spinner>
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      income: {
        name: '',
        amount: 0,
        lastPayout: new Date(),
        from: '',
        autoWriting: 'yes',
        notification: 'yes',
        frequency: {
          counter: 'once',
          period: 'a day'
        }
      }
    }
  },
  mounted () {
    if (this.editedIncome) {
      this.income = {
        ...this.editedIncome,
        lastPayout: new Date(this.editedIncome.lastPayout),
        autoWriting: this.editedIncome.autoWriting ? 'yes' : 'no',
        notification: this.editedIncome.notification ? 'yes' : 'no'
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'editedIncome'
    ])
  },
  props: {
    isCancelBtnDisplayed: Boolean
  },
  methods: {
    ...mapActions([
      'addIncome',
      'editIncome'
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
      if (this.editedIncome) {
        result = await this.editIncome(this.income)
      } else {
        result = await this.addIncome(this.income)
      }
      if (result) {
        this.loading = false
        this.close()
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.income-form {
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
