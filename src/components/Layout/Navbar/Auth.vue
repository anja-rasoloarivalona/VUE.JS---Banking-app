<template>
    <div class="auth">
        <div class="auth__cta" v-if="authMode === 'signup'" @click="setAuthMode('login')">
            Login
        </div>
        <div class="auth__cta" v-else-if="auth.isResettingPassword" @click="setResettingPasswordToFalse">
            Back
        </div>
        <div class="auth__cta" v-else @click="setAuthMode('signup')">
            I'm new
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'authMode',
      'auth'
    ])
  },
  methods: {
    ...mapMutations([
      'setAuthMode',
      'setResettingPasswordToFalse'
    ])
  }
}
</script>

<style lang="scss" scoped>
.auth {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8rem;
    &__cta {
        font-size: $font-m;
        color: var(--mainColor);
        cursor: pointer;
        transition: all .2s ease-in;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
