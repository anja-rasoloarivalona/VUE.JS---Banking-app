<template>
    <div class="starter">
      <component
          :is="mode">
      </component>
    </div>
</template>

<script>
import Auth from './Auth/Auth'
import Setup from './Setup/Setup'

export default {
  data () {
    return {
      loading: false,
      submitted: false,
      action: 'Login',
      mode: 'app-auth'
    }
  },
  components: {
    appAuth: Auth,
    appSetup: Setup
  }
}
</script>

<style lang="scss" scoped>
.starter {
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    width: 100vw;
    height: 100vh;
}
</style>
