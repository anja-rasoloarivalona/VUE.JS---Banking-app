<template>
    <div class="design">
        <div class="design__item">
            <div class="design__item__key">Theme</div>
            <div class="design__item__value design__item__value--theme">
                <div class="design__item__value--theme__choice" :class="{active: currentTheme.includes('light')}">
                    Light
                </div>
                <div
                  class="design__item__value--theme__togglerBar"
                  :class="{'bg-on-surfaceColor': currentTheme.includes('light'), 'bg-surfaceColor': currentTheme.includes('dark') }"
                >
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
          <div class="design__item__key">Color</div>
          <ul class="design__item__listColor">
              <li
                  v-for="design in designList"
                  :key="design.name"
                  class="design__item__listColor__item"
                  :class="{active: activeColor === design.name}"
                  :style="{backgroundColor: design.mainColor}"
                  @click="changeColor(design.name)"
              >
                  <div class="design__item__listColor__item__name">{{ design.name }}</div>
              </li>
          </ul>
        </div>
        <app-btn normal primary @click.native="submitTheme">Save</app-btn>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import theme from '@/assets/theme'
import axios from 'axios'
export default {
  data () {
    return {
      activeColor: '',
      designList: [
        {
          name: 'orangered',
          mainColor: '#ff7315'
        },
        {
          name: 'blue',
          mainColor: '#0084ff'
        },
        {
          name: 'green',
          mainColor: '#027a66'
        }
      ]
    }
  },
  mounted () {
    this.activeColor = this.currentTheme.split('-')[1]
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
      'closeBackdrop'
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
      this.activeColor = color
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
        this.closeBackdrop()
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
    height: 100%;
    &__item {
        display: flex;
        align-items: center;
        margin-bottom: 3rem;
        padding: 1rem 0;
        &__key {
            width: 10rem;
            color: var(--textColor--dark);
        }
        &__value {
            &--theme {
                display: flex;
                align-items: center;
                &__choice {
                    color: var(--textColor--dark);
                    cursor: pointer;
                    &.active {
                        color: var(--textColor)
                    }
                }
                &__togglerBar {
                    margin: 0 1rem;
                    width: 8rem;
                    height: 2rem;
                    // background: var(--surfaceColor);
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
                    background: var(--textColor--dark);
                    transition: all .3s ease-in;
                    &.dark {
                        right: 0;
                    }
                }
            }
        }
        &__listColor {
          list-style: none;
          display: flex;
          width: 100%;
          padding-left: 1.5rem;
          &__item {
            width: 10rem;
            height: 10rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 3rem;
            border-radius: .5rem;
            cursor: pointer;
            color: $color-white;
            &.active {
              border: 2px solid $color-white
            }
          }
        }
    }
    & button {
        position: absolute;
        bottom: 3rem;
        right: 3rem;
    }
}
</style>
