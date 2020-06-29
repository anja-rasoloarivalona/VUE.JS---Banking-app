<template>
    <grid-layout
        :layout.sync="currentLayout"
        :col-num="12"
        :row-height="10"
        :is-draggable="dashboard.isBeingEdited"
        :is-resizable="dashboard.isBeingEdited"
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
        :isResizable="true"
        :is-draggable="dashboard.isBeingEdited"
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
      return this.dashboard.currentLayout.filter(i => i.displayed === true)
    }
  },
  methods: {
    ...mapMutations([
      'initDashboardLayout',
      'tryNewLayout',
      'setDashboardLayout',
      'setCompactToTrue'
    ]),
    layoutUpdatedEvent: function (newLayout) {
      this.tryNewLayout(newLayout)
    }
  },
  watch: {
    user: {
      handler: 'setDashboardLayout',
      immediate: true,
      deep: true
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
