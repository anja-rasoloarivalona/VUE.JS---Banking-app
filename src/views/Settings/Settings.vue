<template>
    <div>
        <component :is="mode">
        </component>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Dashboard from './views/Dashboard'
import Account from './views/Account'
import Theme from './views/Theme'
import Ghost from './views/Ghost'
export default {
  data () {
    return {
      mode: null
    }
  },
  mounted () {
    this.mode = 'dashboard'
    this.setCurrentView('dashboard')
  },
  watch: {
    '$store.state.settings.currentSettingView': function (view) {
      this.mode = view
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentView'
    ])
  },
  components: {
    dashboard: Dashboard,
    account: Account,
    theme: Theme,
    ghost: Ghost
  }
}
</script>

<style lang="scss" scoped>

</style>
