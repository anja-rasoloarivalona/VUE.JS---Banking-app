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
                    <div class="profile__list__item" @click="toggleDarkMode">Dark theme</div>
                    <div class="profile__list__item profile__list__item--logout" @click="$store.dispatch('logout')">
                        <span>Log out</span>
                        <app-icon name="logout" color="dark" size="large"/>
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
      'theme'
    ])
  },
  methods: {
    ...mapMutations([
      'setDashboardIsBeingEditedToTrue',
      'setTheme'
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
    margin-left: 4rem;
    &__list {
        list-style: none;
        background: $color-white;
        top: 3rem;
        left: -7rem;
        width: 20rem;
        position: absolute;
        border-radius: .5rem;
        padding-top: 1rem;
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
                // border-top: 1px solid var(--lineColor);
                &:hover {

                }
            }
        }
    }
}
</style>
