<template>
    <div class="loader">
        <spinner extra-large/>
    </div>
</template>

<script>
import Spinner from '../../Shared/Spinner'
export default {
  components: {
    Spinner
  }
}
</script>

<style lang="scss" scoped>
.loader {
    width: 100vw;
    height: 100vh;
    background: var(--backgroundColor);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
