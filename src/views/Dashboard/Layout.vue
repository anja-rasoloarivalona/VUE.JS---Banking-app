<template>
    <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="50"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
    >
    <grid-item v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :isResizable="true"
        >
            <slot :name="item.i"></slot>
      </grid-item>
    </grid-layout>
</template>

<script>
// target budget: 3 lines = 150 + 20 = 170
// wallet 9 : 450 + 80 = 530
import VueGridLayout from 'vue-grid-layout'
export default {
  data () {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 2, i: 'dashboard-balance' },
        { x: 0, y: 0, w: 8, h: 3, i: 'dashboard-budget' },
        { x: 0, y: 1, w: 4, h: 9, i: 'dashboard-wallet' }
      ]
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
