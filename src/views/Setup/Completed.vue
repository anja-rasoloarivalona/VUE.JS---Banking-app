<template>
    <div class="completed">
        <h1>Congratulations {{this.$store.state.auth.userName}}!</h1>
        <div class="completed__text">
          Your account is ready.
        </div>
        <div class="completed__cta">
            <app-btn normal primary @click.native="retrieveDashboardLayout">
              <span v-if="!loading">Get started</span>
              <app-spinner v-else></app-spinner>
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'dashboardData'
    ])
  },
  methods: {
    ...mapMutations([
      'setAppStatus',
      'initDashboardLayout',
      'setIsAppReadyToTrue'
    ]),
    retrieveDashboardLayout: async function () {
      this.loading = true
      const graphQlQuery = {
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
                ghostMode
              }
            }
          }
        }`
      }
      try {
        const response = await axios.post('/', graphQlQuery)
        const resData = response.data.data.user
        this.loading = false
        this.initDashboardLayout(resData.settings.dashboardLayout)
        this.setAppStatus('active')
        this.setIsAppReadyToTrue()
      } catch (err) {
        console.log(err.response)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.completed {
  position: absolute;
  width: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: $color-white;
  border-radius: .5rem;
  padding: 2rem 0;
  & h1 {
        color: $color-primary;
  }
  &__text {
        margin: 2rem 0;
        font-size: $font-m;
        color: $color-grey--dark;
  }
}
</style>
