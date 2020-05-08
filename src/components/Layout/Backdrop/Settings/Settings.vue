<template>
    <transition name="fade" appear>
        <div class="settings">
            <div class="settings__close" @click="closeBackdrop">
                <app-icon name="close" size="large"/>
            </div>
            <div class="settings__list" :class="{'bg-grey': currentTheme.includes('light'), 'bg-default': currentTheme.includes('dark') }">
                <div
                    class="settings__list__item"
                    v-for="view in views"
                    :key="view.name"
                    :class="{active: view.name.includes(settingsModal.active) || view.name === settingsModal.active}"
                    @click="changeSettingsModalView(view.component)"
                >
                    {{ view.name }}
                </div>
            </div>
            <div class="settings__view" :class="{'bg-surfaceColor': currentTheme.includes('light'), 'bg-on-surfaceColor': currentTheme.includes('dark') }">
                <h2 class="settings__view__title">{{ settingsModal.active}}</h2>
                <component :is="settingsModal.active" @hideForm="closeBackdrop"></component>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import General from './General'
import Design from './Design'
import Ghost from './Ghost'
export default {
  data () {
    return {
      views: [
        {
          name: 'general',
          component: 'general'
        },
        {
          name: 'design',
          component: 'design'
        },
        {
          name: 'ghost mode',
          component: 'ghost'
        },
        {
          name: 'edit dashboard'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentTheme',
      'settingsModal'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop',
      'setSettingsModal',
      'setEditDashboardToTrue'
    ]),
    changeSettingsModalView (nextview) {
      if (nextview !== 'edit dashboard') {
        return this.setSettingsModal(nextview)
      }
      this.setEditDashboardToTrue()
      this.closeBackdrop()
    }
  },
  components: {
    General,
    Design,
    Ghost
  }
}
</script>

<style lang="scss" scoped>
.settings {
    font-size: $font-m;
    border-radius: .5rem;
    overflow: hidden;
    position: relative;
    width: 60vw;
    height: 70vh;
    display: flex;
     &__close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 12;
    }
    &__list {
            width: 17rem;
            // background: var(--backgroundColor);
            &__item {
              height: 5rem;
              margin-bottom: .5rem;
              // background: salmon;
              display: flex;
              align-items: center;
              padding-left: 2rem;
              text-transform: capitalize;
              cursor: pointer;
              transition: all .1s ease-in;
              color: var(--textColor--dark);
              &.active {
                background:var(--mainColor);
                color: $color-white
              }
            }
        }
        &__view {
          // background: var(--on-surfaceColor);
          flex: 1;
          padding: 0 3rem;
          position: relative;
          &__title {
            height: 5rem;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            color: var(--textColor--dark)
          }
        }
}
</style>
