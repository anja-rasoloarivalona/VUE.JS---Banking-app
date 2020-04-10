<template>
    <div class="settings" >
        <ul class="settings__list">
            <li class="settings__list__item" @click="mode = 'account'" :class="{active: mode === 'account'}">Account</li>
            <li class="settings__list__item" @click="mode = 'design'" :class="{active: mode === 'design'}">Design</li>
            <li class="settings__list__item" @click="mode = 'ghost'" :class="{active: mode === 'ghost'}">Ghost mode</li>
        </ul>
        <div class="settings__view">
            <component :is="mode"></component>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from './Account'
import Design from './Design'
import Ghost from './Ghost'
export default {
  data () {
    return {
      mode: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'currentSettingsPannelState'
    ])
  },
  methods: {
    close () {
      if (this.currentSettingsPannelState) {
        this.hideSettingsPannel()
      }
    }
  },
  components: {
    account: Account,
    design: Design,
    ghost: Ghost
  }
}
</script>

<style lang="scss" scoped>
.settings {
    width: 60rem;
    height: 35rem;
    display: flex;
    &__list {
        list-style: none;
        width: 15rem;
        background: var(--surfaceColor);
        &__item {
            height: 5rem;
            display: flex;
            align-items: center;
            padding-left: 2rem;
            cursor: pointer;
            border-bottom: 1px solid var(--on-surfaceColor);
            &.active {
                color: var(--mainColor)
            }
          }
    }
    &__view {
        width: calc(100% - 15rem);
    }
}
</style>
