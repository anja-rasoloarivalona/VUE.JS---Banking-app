<template>
    <div class="balance dashboard__section">
        <h2 class="dashboard__section__title">Balance</h2>
        <div class="balance__value">
            <strong v-if="!ghost">{{userBalance | amount}}</strong>
            <!-- <strong v-else v-html="emoji"></strong> -->
             <strong v-else>$ &#8277;&#8277;&#8277;</strong>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userBalance'
    ]),
    emoji () {
      return '&#128512;'
    }
  },
  props: {
    ghost: Boolean
  }
}
</script>

<style lang="scss" scoped>
.balance {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-left: 3rem;
    &__value {
      height: 5rem;
      font-size: 2.4rem;
      color: var(--mainColor);
    }
}
</style>
