<template>
    <grid-layout
        :layout.sync="currentLayout"
        :col-num="windowWith > 1160 ?  12  :  windowWith > 700 ?  8 : 4"
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
        :isResizable="dashboard.isBeingEdited"
        :is-draggable="dashboard.isBeingEdited"
        >
            <slot :name="item.i"></slot>
      </grid-item>
    </grid-layout>
</template>

<script>
// :col-num=" windowWith > 1160 ? 12 : 8"

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
  data () {
    return {
      windowWith: 0
    }
  },
  created () {
    this.windowWith = window.innerWidth
    window.addEventListener('resize', this.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  },
  computed: {
    ...mapGetters([
      'dashboard',
      'user'
    ]),
    currentLayout () {
      if (this.windowWith > 1160) {
        return this.dashboard.currentLayout.filter(i => i.displayed === true)
      } else {
        if (this.windowWith > 700) {
          return this.dashboard.mediumLayout.filter(i => i.displayed === true)
        } else {
          return this.dashboard.smallLayout.filter(i => i.displayed === true)
        }
      }
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
      console.log('new layiut', newLayout)
      this.tryNewLayout(newLayout)
    },
    resize () {
      this.windowWith = window.innerWidth
      console.log('resized', window.innerWidth)
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
