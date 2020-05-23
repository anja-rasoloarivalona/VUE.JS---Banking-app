<template>
    <div class="errors">
      <error v-for="(error, index) in errors.data" :key="error" :error="error" :index="index"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Error from './Error'
export default {
  computed: {
    ...mapGetters([
      'errors'
    ])
  },
  components: {
    Error
  }
}
</script>

<style lang="scss" scoped>
.errors {
  position: fixed;
  top: 10rem;
  right: 8rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
}
</style>
