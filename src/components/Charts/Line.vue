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
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 2000
            },
            gridLines: {
              color: this.colorLine
            }
          }],
          xAxes: [{
            gridLines: {
              color: this.colorLine
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
    console.log('mounted', this.$refs.canvas)
    this.displayChart()
  },
  watch: {
    gradient1: {
      handler: 'displayChart',
      immediate: false
    },
    data: {
      handler: 'displayChart',
      immediate: false
    },
    currentTheme: {
      handler: 'setColorLine',
      immediate: true
    }
  },
  methods: {
    displayChart () {
      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 310)
      this.gradient.addColorStop(0, this.gradient1)
      this.gradient.addColorStop(0.4, this.gradient2)

      const d = this.data
      d.datasets.forEach(i => {
        i.backgroundColor = this.gradient
        i.borderColor = this.gradient1
        i.pointBackgroundColor = this.gradient1
        i.borderWidth = 1
        i.lineTension = 0
      })
      this.renderChart(d, this.options)
    },
    setColorLine (theme) {
      if (theme.includes('dark')) {
        this.options = {
          ...this.options,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 2000
              },
              gridLines: {
                color: '#2e2e2e'
              }
            }],
            xAxes: [{
              gridLines: {
                color: '#2e2e2e'
              }
            }]
          }
        }
      } else {
        this.options = {
          ...this.options,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 2000
              },
              gridLines: {
                color: '#e4e1e1'
              }
            }],
            xAxes: [{
              gridLines: {
                color: '#e4e1e1'
              }
            }]
          }
        }
      }
      this.displayChart()
    }
  },
  computed: {
    ...mapGetters([
      'currentTheme'
    ])
  }
}
</script>
