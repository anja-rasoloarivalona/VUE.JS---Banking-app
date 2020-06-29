<template>
    <div class="chart-line" v-dragscroll="true">
        <line-chart
            :styles="{height: '170px', width: '80vw', position: 'relative', zIndex: 1}"
            :data="data"
            :stepSize="axisData.stepSize"
            :steps="axisData.steps"
            :maxBalance="maxBalance"
        />
        <div class="axis">
            <span v-for="step in axisData.steps" :key="step">{{step}}</span>
        </div>
    </div>
</template>

<script>
import LineChart from './LineComponent'
import { dragscroll } from 'vue-dragscroll'
export default {
  directives: {
    dragscroll
  },
  computed: {
    axisData () {
      const computedValue = {
        stepSize: 0,
        steps: []
      }
      const data = this.maxBalance
      const initialRes = [0, 2.5, 5, 7.5, 10]
      if (data < 10) {
        computedValue.steps = initialRes.reverse()
        computedValue.stepSize = 2.5
      } else {
        if (data < 100) {
          const factor = 10 * (data.toString().length - 1)
          const res = [0, 5, 10, 15, 20]
          const nbTurn = Math.floor((data - factor) / factor)
          for (let i = 0; i < nbTurn; i++) {
            res.forEach((nb, nbIndex) => {
              res[nbIndex] = res[nbIndex] + initialRes[nbIndex]
            })
            computedValue.steps = res.reverse()
            computedValue.stepSize = res[1] - res[0]
          }
        } else {
          let stepSize = 25
          let maxStep = 0
          let res = [0]
          while (maxStep < data) {
            if (res.length < 6) {
              maxStep += stepSize
              res.push(maxStep)
            } else {
              res = [0]
              maxStep = 0
              stepSize = stepSize * 2
            }
          }
          if (res[res.length - 1] % stepSize === 0) {
            res.push(maxStep + stepSize)
          }
          computedValue.steps = res.reverse()
          computedValue.stepSize = stepSize
        }
      }
      return computedValue
    }
  },
  mounted () {

  },
  props: {
    data: [Object, Array],
    maxBalance: Number
  },
  components: {
    LineChart
  }
}
</script>

<style lang="scss" scoped>
.chart-line {
    position: relative;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 17rem;
    // background: blue;
    padding-left: 1.8rem;
    // cursor: move;
    // cursor: grab;
    & .axis {
        // opacity: 0;
        background: var(--surfaceColor);
        position: fixed;
        left: 3rem;
        top: 4.5rem;
        width: 4rem;
        height: 16.5rem;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 12px;
        color: var(--textColor--dark);
        padding-bottom: 3rem;
    }
}
</style>
