<template>
    <div class="chart">
        <h2 class="dashboard__section__title">Planned expenditures</h2>
        <div class="chart__container">
            <doughnut-chart :styles="chartStyles" ></doughnut-chart>
        </div>
    </div>
</template>

<script>
import DoughnutChart from '@/components/Charts/Doughnut'
export default {
  data () {
    return {
      chartStyles: {
        height: '170px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  components: {
    DoughnutChart
  }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    background: $color-white;
    height: 100%;
    padding: 1rem;

    &__container {
        position: relative;
        width: 100%;
        height: 17rem;
    }
}
</style>
