<template>
    <div class="settings" >
        <div class="settings__back" @click="close">
        </div>
        <div class="settings__pannel">
            <ul class="settings__pannel__list">
                <li class="settings__pannel__list__item" @click="mode = 'account'" :class="{active: mode === 'account'}">Account</li>
                <li class="settings__pannel__list__item" @click="mode = 'design'" :class="{active: mode === 'design'}">Design</li>
                <li class="settings__pannel__list__item" @click="mode = 'ghost'" :class="{active: mode === 'ghost'}">Ghost mode</li>
            </ul>
            <div class="settings__pannel__view">
                <div class="settings__close" @click="hideSettingsPannel">
                    <app-icon name="close" size="large" color="grey"/>
                </div>
                <component :is="mode"></component>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Account from './Account'
import Design from './Design'
import Ghost from './Ghost'
export default {
  data () {
    return {
      mode: 'account'
    }
  },
  mounted () {
    console.log('heeere')
  },
  destroyed () {
    console.log('bye')
  },
  computed: {
    ...mapGetters([
      'currentSettingsPannelState'
    ])
  },
  methods: {
    ...mapMutations([
      'hideSettingsPannel'
    ]),
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
    width: 100vw;
    height: 100vh;
    position: relative;
    &__back {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(26, 26, 26, 0.856);
        z-index: 10;
    }
    &__pannel {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 11;
        width: 60rem;
        height: 35rem;
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
            position: relative;
        }
    }
    &__close {
        position: absolute;
        top: 1rem;
        right: 1rem

    }
}
</style>
