<template>
    <div class="profile">
        <app-toggle-list>
            <template #value>
                <span :style="{cursor: 'pointer'}">{{ auth.userName }}</span>
            </template>
            <template #list>
                <ul class="profile__list" :style="{boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}">
                    <div class="profile__list__item">Account</div>
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
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'auth',
      'theme'
    ])
  }
}
</script>

<style lang="scss" scoped>
.profile {
    &__list {
        list-style: none;
        background: $color-white;
        top: 3rem;
        left: -3rem;
        width: 13rem;
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
                &:hover {

                }
            }
        }
    }
}
</style>
