<template>
    <div class="header">
        <div class="header__details">
            <div class="header__details__title">
                <h1>{{$t('period')}}</h1>
                <app-select-input v-model="period" :options="periodLists" i18/>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    {{$t('incomes')}}
                </div>
                <div class="header__details__item__value">
                    <span v-if="data.totalIncome !== 0">{{data.totalIncome | amount}}</span>
                    <span v-else>-</span>
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    {{$t('expenses')}}
                </div>
                <div class="header__details__item__value">
                    <span v-if="data.totalExpense !== 0">{{data.totalExpense | amount}}</span>
                    <span v-else>-</span>
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    {{$t('savings')}}
                </div>
                <div class="header__details__item__value">
                    {{data.totalIncome - data.totalExpense | amount}}
                </div>
            </div>
        </div>
        <div class="header__chart">
            <doughnut-chart :styles="chartStyles" :datacollection="chartData"></doughnut-chart>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DoughnutChart from '@/components/Charts/Doughnut'
export default {
  data () {
    return {
      period: '',
      chartData: null,
      chartStyles: {
        height: '130px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  model: {
    prop: 'currentPeriod',
    event: 'click'
  },
  computed: {
    ...mapGetters([
      'expensesList'
    ])
  },
  mounted () {
    this.period = this.currentPeriod
  },
  created () {
    const labels = []
    const data = []
    const bg = []

    for (const expense in this.data.expenseData) {
      labels.push(expense)
      data.push(this.data.expenseData[expense].total)
      bg.push(this.expensesList[expense].color)
    }

    if (labels.length > 0 && data.length > 0) {
      this.chartData = {
        labels: labels,
        datasets: [{ data: data, backgroundColor: bg }]
      }
    }
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
    currentPeriod: Object,
    periodLists: Array,
    data: Object
  },
  components: {
    DoughnutChart
  }
}
</script>

<style lang="scss" scoped>
.header {
    // padding-left: 2rem;
    margin-bottom: 3rem;
    // background: green;
    display: flex;
    align-items: center;
    &__details {
      // background: red;
      width: 100%;
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
