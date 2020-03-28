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
              stepSize: 500
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
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
    // this.gradient.addColorStop(1, 'black')

    console.log(this.data)

    const datacollection = {
      labels: ['jan', 'feb', 'march', 'apr'],
      datasets: [
        {
          label: 'Balance',
          data: [600, 1200, 1900, 450],
          backgroundColor: this.gradient,
          borderColor: 'grey',
          pointBackgroundColor: 'white',
          borderWidth: 1
        }
      ]
    }

    this.renderChart(datacollection, this.options)
  }
}
</script>
