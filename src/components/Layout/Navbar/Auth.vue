<template>
    <div class="auth">
        <div class="auth__cta" v-if="auth.isResettingPassword" @click="setResettingPasswordToFalse">
            Back
        </div>
        <lang-switcher v-else/>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LangSwitcher from './components/LangSwitcher/LangSwitcher'
export default {
  computed: {
    ...mapGetters([
      'auth'
    ])
  },
  methods: {
    ...mapMutations([
      'setResettingPasswordToFalse'
    ])
  },
  components: {
    LangSwitcher
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
