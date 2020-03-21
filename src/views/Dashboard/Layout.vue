<template>
    <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="100"
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
        :key="item.i">
            <slot :name="item.i"></slot>
      </grid-item>
    </grid-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
export default {
  data () {
    return {
      layout: [
        { x: 0, y: 0, w: 3, h: 1, i: 'dashboard-balance' },
        { x: 0, y: 1, w: 12, h: 2, i: 'dashboard-wallet' },
        { x: 0, y: 0, w: 12, h: 2, i: 'dashboard-budget' }
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
