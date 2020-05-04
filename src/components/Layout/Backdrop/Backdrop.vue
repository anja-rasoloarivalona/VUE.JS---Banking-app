<template>
    <div class="backdrop">
        <slot />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ])
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 10, 0.767);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
