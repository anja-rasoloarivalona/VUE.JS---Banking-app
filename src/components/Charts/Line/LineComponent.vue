<script>
import { mapGetters } from 'vuex'
import { Line, mixins } from 'vue-chartjs'
export default {
  extends: Line,
  mixins: mixins.reactiveProp,
  data () {
    return {
      options: {
        legend: {
          display: false
        },
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
      'theme',
      'user'
    ]),
    optionsScales () {
      return {
        yAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
            stepSize: this.stepSize,
            suggestedMax: this.steps[0],
            min: 1
          },
          gridLines: {
            display: true,
            color: this.theme.isDark ? '#2e2e2e' : '#e4e1e1'
          }
        }],
        xAxes: [{
          ticks: {
            display: true
          },
          gridLines: {
            display: true,
            color: this.theme.isDark ? '#2e2e2e' : '#e4e1e1'
          }
        }]
      }
    }
  },
  props: {
    data: [Array, Object],
    stepSize: Number,
    steps: Array,
    maxBalance: Number
  },
  mounted () {
    this.displayChart()
    // console.log('user', this.user)
  },
  watch: {
    'user.monthlyReports': function (val) {
      console.log('monthly changed')
      this.displayChart()
    },
    'theme.currentTheme': {
      handler: 'displayChart',
      immediate: false
    },
    options: {
      handler: 'displayChart',
      immediate: false
    }
  },
  methods: {
    displayChart () {
      const d = this.data
      d.datasets.forEach(i => {
        i.borderWidth = 1
        i.lineTension = i.label !== 'Balance' ? 0.3 : 0.1
      })
      this.renderChart(d, { ...this.options, scales: this.optionsScales })
    }
  }
}

</script>
