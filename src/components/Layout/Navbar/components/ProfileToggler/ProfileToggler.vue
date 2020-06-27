<template>
    <div class="profile">
        <app-toggle-list>
            <template #value>
                <span :style="{cursor: 'pointer'}">{{ auth.userName }}</span>
            </template>
            <template #list>
                <ul class="profile__list" :style="{boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}">
                    <div class="profile__list__item">Account</div>
                    <div class="profile__list__item" @click="setDashboardIsBeingEditedToTrue">Edit Dashboard</div>
                    <div class="profile__list__item profile__list__item profile__list__item--currency" @click="openBackdrop('currency')">
                        <span>Currency</span>
                        <span>{{displayedCurrency}}</span>
                    </div>
                    <div class="profile__list__item profile__list__item--theme">
                        <span>Dark mode</span>
                        <div class="profile__list__item--theme__switch" @click="toggleDarkMode" :class="{active: theme.isDark}">
                            <div class="profile__list__item--theme__switch__bar"></div>
                            <div class="profile__list__item--theme__switch__toggle"></div>
                        </div>
                    </div>
                    <div class="profile__list__item profile__list__item--logout" @click="$store.dispatch('logout')">
                        <span>Log Out</span>
                        <!-- <app-icon name="logout" color="dark" size="large"/> -->
                    </div>
                </ul>
            </template>
        </app-toggle-list>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { setThemeQuery } from '@/graphQL/settingsQuery'
import axios from 'axios'
export default {
  computed: {
    ...mapGetters([
      'auth',
      'theme',
      'currentCurrency'
    ]),
    displayedCurrency () {
      return this.currentCurrency.split('-')[0].trim()
    }
  },
  methods: {
    ...mapMutations([
      'setDashboardIsBeingEditedToTrue',
      'setTheme',
      'openBackdrop'
    ]),
    toggleDarkMode: async function () {
      const nextTheme = this.theme.isLight ? `dark-${this.theme.mainColor}` : `light-${this.theme.mainColor}`
      const query = setThemeQuery(nextTheme)
      try {
        await axios.post('/', query)
        this.setTheme(nextTheme)
      } catch (err) {
        console.log(err.response)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
    &__list {
        list-style: none;
        background: $color-white;
        top: 3rem;
        left: -7rem;
        width: 23rem;
        position: absolute;
        border-radius: .5rem;
        padding: 1rem 0;
        &__item {
        padding: 1rem 2rem;
        cursor: pointer;
        color: var(--textColor--dark);
            &:hover {
                color: var(--mainColor)
            }
            &--logout {
                display: flex;
                align-items: center;
                justify-content: space-between;
                // margin-top: 2rem;
                // margin-bottom: 1rem;
                border-top: 1px solid #ece9e9;
                &:hover {

                }
            }
            &--currency {
                // background: red;
                display: flex;
                align-items: center;
                justify-content: space-between;
                & span:nth-child(2){
                    // background: blue;
                    width: 5rem
                }
            }
            &--theme {
                // background: blue;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &__switch {
                    background: #f5f5f5;
                    height: 1rem;
                    width: 5rem;
                    position: relative;
                    border-radius: 1.5rem;
                    cursor: pointer;
                    box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.247);
                    &__bar {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 0%;
                        height: 100%;
                        border-radius: 1.5rem;
                        background: var(--mainColor--dark);
                        transition: all .3s ease-in;
                    }
                    &__toggle {
                        background: var(--mainColor);
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                        width: 2rem;
                        height: 2rem;
                        // box-shadow: -1px 0px 5px 1px rgba(37, 37, 37, 0.829);
                        border-radius: 50%;
                        transition: all .3s ease-in;
                    }
                    &.active {
                        & .profile__list__item--theme__switch__toggle {
                            transform: translateX(3rem);
                        }
                        & .profile__list__item--theme__switch__bar {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>
