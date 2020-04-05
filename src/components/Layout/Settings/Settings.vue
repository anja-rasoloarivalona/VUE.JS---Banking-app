<template>
    <div class="settings">
        <div class="settings__pannel">
            <ul class="settings__pannel__list">
                <li class="settings__pannel__list__item" @click="mode = 'account'" :class="{active: mode === 'account'}">Account</li>
                <li class="settings__pannel__list__item" @click="mode = 'design'" :class="{active: mode === 'design'}">Design</li>
                <li class="settings__pannel__list__item" @click="mode = 'ghost'" :class="{active: mode === 'ghost'}">Ghost mode</li>
            </ul>
            <div class="settings__pannel__view">
                <component :is="mode"></component>
            </div>
        </div>
    </div>
</template>

<script>
import Account from './Account'
import Design from './Design'
import Ghost from './Ghost'
export default {
  data () {
    return {
      mode: 'account'
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
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(26, 26, 26, 0.856);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    &__pannel {
        min-width: 60rem;
        min-height: 35rem;
        background: var(--app-item-bg);
        display: flex;
        font-size: $font-m;
        border: 1px solid var(--app-line-color);
        border-radius: .5rem;
        &__list {
            list-style: none;
            width: 15rem;
            &__item {
                height: 5rem;
                display: flex;
                align-items: center;
                padding-left: 2rem;
                cursor: pointer;
                border-bottom: 1px solid var(--app-line-color);
                &.active {
                    color: var(--app-color-main)
                }
            }
        }
        &__view {
            width: calc(100% - 15rem);
            background: var(--app-line-color);
        }
    }
}
</style>
