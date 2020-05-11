<template>
    <div class="header">
        <div class="header__details">
            <div class="header__details__title">
                <h1>Period</h1>
                <app-select-input v-model="period" :options="lists"/>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Incomes
                </div>
                <div class="header__details__item__value">
                    $ 1200
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Expenses
                </div>
                <div class="header__details__item__value">
                    $ 600
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Savings
                </div>
                <div class="header__details__item__value">
                    $ 600
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      period: '',
      lists: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    this.user.monthlyReports.forEach(report => {
      this.lists.push(report.period)
    })
    const d = new Date()
    const period = `${d.getMonth() + 1}-${d.getFullYear()}`
    this.period = period
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
