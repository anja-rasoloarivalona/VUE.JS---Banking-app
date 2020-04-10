<template>
    <div class="backdrop" @click.self="closeBackdrop">
        <transition name="fade" appear>
            <div class="backdrop__modal">
                <div class="backdrop__modal__close" @click="closeBackdrop">
                    <app-icon name="close" size="large" color="grey"/>
                </div>
                <component :is="mode"></component>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Settings from './Settings/Settings'
import TransactionsFrom from '@/components/Forms/TransactionsForm'
export default {
  data () {
    return {
      mode: null
    }
  },
  computed: {
    ...mapGetters([
      'currentBackdropState'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ]),
    setBackdropModal () {
      this.mode = this.currentBackdropState.modal
    }
  },
  watch: {
    currentBackdropState: {
      handler: 'setBackdropModal',
      immediate: true
    }
  },
  mounted () {
    console.log(this.currentBackdropState)
  },
  components: {
    settings: Settings,
    transactions: TransactionsFrom
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 10, 0.767);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    &__modal {
        background: var(--on-surfaceColor);
        font-size: $font-m;
        border-radius: 1rem;
        overflow: hidden;
        position: relative;
        &__close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 12;
        }
    }
}
</style>
