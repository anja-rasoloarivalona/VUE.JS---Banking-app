<template>
    <div class="design">
        <div class="design__item">
            <div class="design__item__key">Theme</div>
            <div class="design__item__value design__item__value--theme">
                <div class="design__item__value--theme__choice" :class="{active: theme.isLight}">
                    Light
                </div>
                <div
                  class="design__item__value--theme__togglerBar"
                  :class="{'bg-on-surfaceColor': theme.isLight, 'bg-surfaceColor': theme.isDark }"
                >
                    <div class="design__item__value--theme__toggler"
                         :class="{light: theme.isLight, dark: theme.isDark}"
                         @click="changeTheme"
                    >
                    </div>
                </div>
                <div class="design__item__value--theme__choice" :class="{active: theme.isDark}">
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
    this.activeColor = this.theme.currentTheme.split('-')[1]
  },
  computed: {
    ...mapGetters([
      'theme'
    ])
  },
  methods: {
    ...mapMutations([
      'tryNewTheme',
      'saveNewTheme',
      'cancelNewTheme',
      'closeBackdrop'
    ]),
    changeTheme () {
      const nextTheme = this.theme.isLight ? `dark-${this.theme.mainColor}` : `light-${this.theme.mainColor}`
      this.tryNewTheme(nextTheme)
    },
    changeColor (color) {
      const nextTheme = this.theme.isLight ? `light-${color}` : `dark-${color}`
      this.tryNewTheme(nextTheme)
    },
    submitTheme: async function () {
      const graphqlQuery = {
        query: `mutation {
                setTheme(theme: "${this.theme.currentTheme}") {
                    settings {
                        theme
                    }
                }
            }
      `
      }
      try {
        await axios.post('', graphqlQuery)
        this.saveNewTheme()
        this.closeBackdrop()
      } catch (err) {
        console.log(err.response)
      }
    }
  },
  beforeDestroy () {
    if (this.theme.currentTheme !== this.theme.previousTheme) {
      this.cancelNewTheme()
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
