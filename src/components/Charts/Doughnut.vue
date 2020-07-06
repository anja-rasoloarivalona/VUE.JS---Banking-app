<script>
import { Doughnut, mixins } from 'vue-chartjs'
export default {
  extends: Doughnut,
  mixins: mixins.reactiveProp,
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              return `${data.labels[item.index]}: ${data.datasets[0].data[item.index]} ${this.$store.state.settings.currentCurrency.split('-')[0].trim()}`
            }
          }
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
    this.displayChart(this.datacollection)
  },
  watch: {
    datacollection: function (data) {
      this.displayChart(data)
    }
  },
  methods: {
    displayChart (data) {
      this.renderChart(data, this.options)
    }
  },
  props: ['datacollection']
}
</script>
