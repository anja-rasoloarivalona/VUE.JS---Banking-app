<script>
import { mapGetters } from 'vuex'
import { Line, mixins } from 'vue-chartjs'
export default {
  extends: Line,
  mixins: mixins.reactiveProp,
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 170,
        elements: {
          point: {
            radius: 0
          }
        }
      },
      gradient: null
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ]),
    optionsScales () {
      return {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 500
          },
          gridLines: {
            color: this.theme.isDark ? '#2e2e2e' : '#e4e1e1'
          }
        }],
        xAxes: [{
          ticks: {
            // display: false
          },
          gridLines: {
            color: this.theme.isDark ? '#2e2e2e' : '#e4e1e1'
          }
        }]
      }
    }
  },
  props: ['data', 'gradient1', 'gradient2'],
  mounted () {
    this.displayChart()
  },
  watch: {
    data: {
      handler: 'displayChart',
      immediate: false
    },
    'theme.currentTheme': {
      handler: 'displayChart',
      immediate: true
    },
    options: {
      handler: 'displayChart',
      immediate: false
    }
  },
  methods: {
    displayChart () {
      // this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 310)
      // this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 710)
      // this.gradient.addColorStop(0, this.gradient1)
      // this.gradient.addColorStop(0.4, this.gradient2)
      const d = this.data
      d.datasets.forEach(i => {
        i.borderWidth = 2
        i.lineTension = 0.1
        // i.backgroundColor = this.gradient
        // i.borderColor = this.gradient1
        // i.pointBackgroundColor = this.gradient1
      })
      this.renderChart(d, { ...this.options, scales: this.optionsScales })
    }
  }
}
</script>
