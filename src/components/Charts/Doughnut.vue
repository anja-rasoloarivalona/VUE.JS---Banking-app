<script>
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right'
        }
      }
    }
  },
  mounted () {
    const datacollection = {
      datasets: [
        {
          data: [10, 20, 30],
          backgroundColor: ['red', 'brown', 'salmon']
        }
      ],
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    }
    this.renderChart(datacollection, this.options)
  }
}
</script>
