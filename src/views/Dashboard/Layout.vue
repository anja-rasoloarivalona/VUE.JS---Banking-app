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
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      layout: [],
      updatedLayout: null
    }
  },
  watch: {
    'dashboardData.currentDashboardLayout': {
      handler: 'setLayout',
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'isEditingDashboard',
      'dashboardData'
    ]),
    isSettingUp () {
      if (this.isEditingDashboard) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDefaultDashboardLayout',
      'setCurrentDashboardLayout'
    ]),
    setLayout () {
      if (this.dashboardData.currentDashboardLayout.length > 0) {
        this.layout = this.dashboardData.currentDashboardLayout
      } else {
        this.retrieveLayout()
      }
    },
    layoutUpdatedEvent: function (newLayout) {
      this.updatedLayout = newLayout
      console.log('layout updated')
    },
    retrieveLayout: async function () {
      const graphqlQuery = {
        query: `{
            user {
              settings {
                dashboardLayout {
                  x
                  y
                  w
                  h
                  i
                  displayed
                }
              }
            }
        }
        `
      }
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.user
        this.layout = resData.settings.dashboardLayout
        this.setDefaultDashboardLayout(resData.settings.dashboardLayout)
        this.setCurrentDashboardLayout(resData.settings.dashboardLayout)
      } catch (err) {
        console.log(err.response)
      }
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
