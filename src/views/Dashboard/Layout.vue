<template>
    <grid-layout
        :layout="currentLayout"
        :col-num="12"
        :row-height="10"
        :is-draggable="dashboard.isBeingEdited"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        @layout-updated="layoutUpdatedEvent"
    >
    <grid-item v-for="item in currentLayout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :minH="item.minH"
        :minW="item.minW"
        :key="item.i"
        :isResizable="dashboard.isBeingEdited"
        >
            <slot :name="item.i"></slot>
      </grid-item>
    </grid-layout>
</template>

<script>
// one line : 10
// two line : 20 + 10 = 30
// three line : 30 + 20 = 50
// four lines : 40 + 30 = 70
// 5 : 50 + 40 = 90
// 6: 60 + 50= 110
// 7: 70 + 60 = 130
// 8: 150
// 9: 170
// 10: 190
// 11: 210
// 12: 230
// 13: 250
// 14: 270
// 15: 290
// 17: 310
// 18: 330

import VueGridLayout from 'vue-grid-layout'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'dashboard',
      'user'
    ]),
    currentLayout () {
      console.log('dashboad', this.dashboard.currentLayout)
      return this.dashboard.currentLayout.filter(i => i.displayed === true)
    }
  },
  watch: {
    // 'dashboard.currentLayout': function (layout) {
    //   // console.log('watchd current changed', layout[6].x)
    //   // this.layout = layout
    // },
    // 'dashboard.previousLayout': function (layout) {
    //   // console.log('prev changed', layout[6].x)
    //   // this.layout = layout
    // }
    // 'user.expenses': function (userExpenses) {
    //   this.setDashboardLayout(null, userExpenses)
    // },
    // 'user.wallets': function (userWallets) {
    //   this.setDashboardLayout(null, null, userWallets)
    // }
  },
  methods: {
    ...mapMutations([
      'initDashboardLayout',
      'tryNewLayout'
    ]),
    layoutUpdatedEvent: function (newLayout) {
      console.log(newLayout)
      this.tryNewLayout(newLayout)
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
