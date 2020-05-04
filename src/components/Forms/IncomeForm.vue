<template>
    <form class="form">
        <app-basic-input v-model="income.name" id="name"/>
        <app-basic-input v-model="income.amount" id="amount" />
        <app-date-input v-model="income.lastPayout" id="last payout" />
        <app-basic-input v-model="income.from" id="from" />
        <app-select-input v-model="income.autoWriting" id="auto writing" :options="['yes', 'no']" />
        <app-select-input v-model="income.notification" id="notification" :options="['yes', 'no']" />
        <app-frequency-input v-model="income.frequency" id="frequency"/>
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
import { mapActions, mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'user',
      'currentAppStatus'
    ])
  },
  props: {
    edited: Object,
    isCancelBtnDisplayed: Boolean
  },
  methods: {
    ...mapActions([
      'addIncome',
      'editIncome'
    ]),
    submit: async function () {
      this.loading = true
      let result = false
      if (this.edited) {
        result = await this.editIncome(this.income)
      } else {
        result = await this.addIncome(this.income)
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
