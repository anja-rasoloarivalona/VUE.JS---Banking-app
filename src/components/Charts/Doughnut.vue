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
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  },
  props: ['datacollection']
}
</script>
