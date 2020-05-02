<template>
    <div class="completed">
        Completed
        <div class="completed__cta">
            <app-btn normal primary>Get started</app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user',
      'dashboardData'
    ])
  },
  methods: {
    ...mapMutations([
      'setDefaultDashboardLayout'
    ]),
    submit () {
      this.setDefaultDashboardLayout(this.user)
      const grapqlQuery = this.dashboardData.currentDashboardLayout
      console.log(grapqlQuery)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
