<template>
    <div class="design">
        <div class="design__item">
            <div class="design__item__key">Theme</div>
            <div class="design__item__value design__item__value--theme">
                <div class="design__item__value--theme__choice" :class="{active: currentTheme.includes('light')}">
                    Light
                </div>
                <div class="design__item__value--theme__togglerBar">
                    <div class="design__item__value--theme__toggler"
                         :class="{light: currentTheme.includes('light'), dark: currentTheme.includes('dark')}"
                         @click="changeTheme"
                    >
                    </div>
                </div>
                <div class="design__item__value--theme__choice" :class="{active: currentTheme.includes('dark')}">
                    Dark
                </div>
            </div>
        </div>
        <div class="design__item">
            <app-color-input v-model="colorMain" :parentColorsList="['green', 'blue', 'orangered']" @click="changeColor($event)"></app-color-input>
        </div>
        <app-btn normal primary @click.native="submitTheme">Save</app-btn>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import theme from '@/assets/theme'
import axios from 'axios'
export default {
  data () {
    return {
      colorMain: null
    }
  },
  mounted () {
    this.colorMain = theme[this.currentTheme]['--app-color-main']
  },
  computed: {
    ...mapGetters([
      'currentTheme',
      'previousTheme'
    ])
  },
  methods: {
    ...mapMutations([
      'setTheme',
      'setPreviousTheme',
      'hideSettingsPannel'
    ]),
    changeTheme () {
      let result
      const color = this.currentTheme.split('-')[1]
      if (this.currentTheme.includes('dark')) {
        result = `light-${color}`
        this.setTheme(result)
      } else {
        result = `dark-${color}`
        this.setTheme(result)
      }
      const htmlElement = document.documentElement
      htmlElement.setAttribute('theme', result)
    },
    changeColor (color) {
      let result
      if (this.currentTheme.includes('light')) {
        result = `light-${color}`
        this.setTheme(result)
      } else {
        result = `dark-${color}`
        this.setTheme(result)
      }
      const htmlElement = document.documentElement
      htmlElement.setAttribute('theme', result)
    },
    submitTheme: async function () {
      const graphqlQuery = {
        query: `mutation {
                setTheme(theme: "${this.currentTheme}") {
                    settings {
                        theme
                    }
                }
            }
      `
      }
      try {
        const response = await axios.post('', graphqlQuery)
        const resData = response.data.data.setTheme
        this.setTheme(resData.settings.theme)
        this.setPreviousTheme(resData.settings.theme)
        this.hideSettingsPannel()
      } catch (err) {
        console.log(err)
      }
    }
  },
  beforeDestroy () {
    if (this.currentTheme !== this.previousTheme) {
      this.setTheme(this.previousTheme)
      const htmlElement = document.documentElement
      htmlElement.setAttribute('theme', this.previousTheme)
    }
  }
}
</script>

<style lang="scss" scoped>
.design {
    padding: 1rem;
    position: relative;
    height: 100%;
    &__item {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        padding: 1rem 0;
        padding-left: 2rem;
        &__key {
            width: 10rem;
            color: var(--app-title-color-secondary)
        }
        &__value {
            &--theme {
                display: flex;
                align-items: center;
                &__choice {
                    color: var(--app-title-color-secondary);
                    cursor: pointer;
                    &.active {
                        color: var(--app-text-color)
                    }
                }
                &__togglerBar {
                    margin: 0 1rem;
                    width: 8rem;
                    height: 2rem;
                    background: var(--app-item-bg);
                    border-radius: 1rem;
                    position: relative;
                }
                &__toggler {
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    background: var(--app-title-color-secondary);
                    transition: all .3s ease-in;
                    &.dark {
                        right: 0;
                    }
                }
            }
            &--color {
                width: 2rem;
                height: 2rem;
                border-radius: .5rem;
                background: var(--app-color-main);
                cursor: pointer;
            }
        }
    }
    & button {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
    }
}
</style>
