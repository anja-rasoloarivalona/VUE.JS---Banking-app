<template>
    <div class="chart dashboard__section">
        <h2 class="dashboard__section__title">History</h2>
        <div class="chart__container">
            <line-chart :data="datacollection" :styles="myStyles" :gradient1="'green'" :gradient2="'transparent'" ></line-chart>
        </div>
    </div>
</template>

<script>
import LineChart from '@/components/Charts/Line'
export default {
  data () {
    return {
      datacollection: {
        labels: ['jan', 'feb', 'march', 'apr'],
        datasets: [
          {
            label: 'Balance',
            data: [600, 1200, 1900, 450]
          }
        ]
      },
      myStyles: {
        height: '170px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  components: {
    LineChart
  }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-left: 3rem;

    &__container {
        position: relative;
        width: 100%;
        height: 17rem;
    }
}
</style>
