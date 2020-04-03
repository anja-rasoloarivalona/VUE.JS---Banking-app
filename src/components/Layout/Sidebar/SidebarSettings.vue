<template>
    <ul class="sidebar__list" key="settings">
        <li class="settings__item" :class="{active: currentSettingView === 'dashboard'}" @click="setCurrentView('dashboard')">
            Dashboard
        </li>
        <li class="settings__item" :class="{active: currentSettingView === 'account'}" @click="setCurrentView('account')">
            Account
        </li>
        <li class="settings__item" :class="{active: currentSettingView === 'theme'}" @click="setCurrentView('theme')">
            Theme
        </li>
        <li class="settings__item" :class="{active: currentSettingView === 'ghost'}" @click="setCurrentView('ghost')">
            Ghost Mode
        </li>
        <li class="settings__item" :class="{active: currentSettingView === 'currency'}" @click="setCurrentView('currency')">
            Currency
        </li>
        <li class="settings__item">
            Logout
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentSettingView'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentView'
    ])
  }
}
</script>

<style lang="scss" scoped>
.settings__item {
    padding: 2rem 0;
    padding-left: 2rem;
    margin-bottom: .5rem;
    font-size: $font-m;
    border-bottom: 1px solid var(--app-line-color);
    cursor: pointer;
    &.active {
        color: var(--app-color-main)
    }
}
</style>
