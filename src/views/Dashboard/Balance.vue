<template>
    <div class="balance dashboard__section">
        <h2 class="dashboard__section__title">Balance</h2>
        <div class="balance__value">
            <strong>${{userBalance | amount}}</strong>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userBalance'
    ])
  }
}
</script>

<style lang="scss" scoped>
.balance {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-left: 3rem;
    width: 100%;
    & h2 {
        margin-bottom: 1rem;
    }
    &__value {
      height: 5rem;
      font-size: 2.4rem;
      color: var(--app-color-main);
    }
}
</style>
