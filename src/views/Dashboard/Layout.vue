<template>
    <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="10"
        :is-draggable="isSettingUp"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        @layout-updated="layoutUpdatedEvent"
    >
    <grid-item v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :isResizable="isSettingUp"
        >
            <slot :name="item.i"></slot>
      </grid-item>
    </grid-layout>
</template>

<script>
// one line : 10
// two line : 20 + 10 = 30
// three line : 30 + 20 = 50
// 4 lines : 40 + 30 = 70
// 5 lines : 50 + 40 = 90
// 6 lines : 60 + 50 = 110
// 7 lines : 130
// 8 : 150
// 9 : 170
// 10 : 190
// 11 : 210
// 12 : 230
// 13 : 250
// 14 : 270
// 15 :  290
// 16: 310
// 17:  330
// 18: 350

import VueGridLayout from 'vue-grid-layout'
import { mapGetters } from 'vuex'
// import axios from 'axios'
export default {
  data () {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 6, i: 'dashboard-balance' },
        { x: 0, y: 6, w: 8, h: 0, i: 'dashboard-budget' },
        { x: 8, y: 0, w: 4, h: 5, i: 'dashboard-wallet' },
        { x: 0, y: 12, w: 8, h: 6, i: 'dashboard-transactions' },
        { x: 4, y: 0, w: 4, h: 6, i: 'dashboard-goal' },
        { x: 4, y: 0, w: 4, h: 6, i: 'dashboard-monthly-report' },
        { x: 0, y: 12, w: 8, h: 12, i: 'dashboard-transactions-chart' },
        { x: 0, y: 6, w: 4, h: 6, i: 'dashboard-available-instantly' },
        { x: 8, y: 0, w: 4, h: 12, i: 'dashboard-expenses-chart' }
      ],
      updatedLayout: null
    }
  },
  created () {
    let budgetHeight = 3
    this.$store.state.user.expenses.forEach(expense => {
      if (expense.expenseType === 'variable') {
        budgetHeight = budgetHeight + 3
      }
    })
    this.layout[1].h = budgetHeight
    this.layout[2].h = 4 + (this.$store.state.user.wallets.length * 7)
    this.layout[3].h = 6 + (2 * 3)
  },
  mounted () {

  },
  computed: {
    ...mapGetters([
      'currentSettingView'
    ]),
    isSettingUp () {
      if (this.currentSettingView && this.currentSettingView === 'dashboard') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    layoutUpdatedEvent: function (newLayout) {
      this.updatedLayout = newLayout
      console.log('Updated layout: ', newLayout)
    },
    submit: async function () {
      // const graphqlQuery = {
      //   query: `{
      //       updateDashboardLayout(layoutInput: "${this.newLayout}") {
      //         x
      //         y
      //         w
      //         h
      //         i
      //       }
      //     }`
      // }
      // try {
      //   const response = axios.post('', graphqlQuery)
      //   console.log(response)
      // } catch (err) {
      //   console.log(err)
      // }
    }
  },
  components: {
    gridLayout: VueGridLayout.GridLayout,
    gridItem: VueGridLayout.GridItem
  }
}
</script>

<style lang="scss" scoped>

</style>
