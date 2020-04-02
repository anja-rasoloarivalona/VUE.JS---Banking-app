<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 170,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1000
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        elements: {
          point: {
            radius: 0
          }
        }
      },
      gradient: null
    }
  },
  props: ['data', 'gradient1', 'gradient2'],
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 650)
    this.gradient.addColorStop(0, this.gradient1)
    this.gradient.addColorStop(0.4, this.gradient2)

    const d = this.data
    d.datasets.forEach(i => {
      i.backgroundColor = this.gradient
      i.borderColor = 'grey'
      i.pointBackgroundColor = 'grey'
      i.borderWidth = 1
    })
    this.renderChart(d, this.options)
  }
}
</script>
