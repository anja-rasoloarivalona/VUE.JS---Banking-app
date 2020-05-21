<template>
    <div class="header">
        <div class="header__details">
            <div class="header__details__title">
                <h1>Period</h1>
                <app-select-input v-model="period" :options="periodLists"/>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Incomes
                </div>
                <div class="header__details__item__value">
                    ${{currentReport.income | amount}}
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Expenses
                </div>
                <div class="header__details__item__value">
                    ${{currentReport.expense | amount}}
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Savings
                </div>
                <div class="header__details__item__value">
                    ${{currentReport.income - currentReport.expense | amount}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      period: ''
    }
  },
  mounted () {
    this.period = this.currentPeriod
  },
  watch: {
    period: {
      handler: 'setPeriod',
      immediate: true
    }
  },
  methods: {
    setPeriod (period) {
      if (period !== '') {
        this.$emit('changePeriod', period)
      }
    }
  },
  props: {
    currentPeriod: String,
    currentReport: Object,
    periodLists: Array
  }
}
</script>

<style lang="scss" scoped>
.header {
    padding-left: 2rem;
    margin-bottom: 3rem;
    &__details {
        &__title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 3rem;
            width: 30rem;
            & h1 {
              color: var(--textColor--dark)
            }
            & label {
                margin-bottom: 0rem !important;
                width: 15rem;
            }
        }
        &__item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: $font-m;
            margin-bottom: 2rem;
            width: 30rem;
            &__key {
                color: var(--textColor--dark);
            }
        }
    }
}
</style>
