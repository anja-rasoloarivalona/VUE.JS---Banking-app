<template>
    <div class="editing-dashboard">
        <ul class="editing-dashboard__list">
            <li
              class="editing-dashboard__list__item"
              v-for="action in dashboardCta"
              :key="action.value"
              :class="{active: action.value === currentAction, save: action.value === 'save'}"
              @click="selectAction(action.value)"
            >
                <fa-icon :icon="action.icon" size="lg" />
                <span>{{$t(action.i18)}}</span>
            </li>
        </ul>
        <ul class="editing-dashboard__list">
          <li class="editing-dashboard__list__item editing-dashboard__list__item--warning" @click="selectAction('reset')">
              <fa-icon icon="undo" size="lg"/>
              <span>Reset</span>
          </li>
          <li class="editing-dashboard__list__item editing-dashboard__list__item--warning" @click="selectAction('cancel')">
              <fa-icon icon="arrow-right" size="lg"/>
              <span>Cancel</span>
          </li>
        </ul>
    </div>
</template>

<script>
import themes from '@/assets/theme'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      currentAction: 'move'
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'dashboard'
    ]),
    dashboardCta () {
      return [
        {
          i18: 'save',
          value: 'save',
          icon: 'check'
        },
        {
          i18: 'move&Resize',
          value: 'move',
          icon: 'arrows-alt'
        },
        {
          i18: 'addItem',
          value: 'add',
          icon: 'plus'
        },
        {
          i18: 'removeItem',
          value: 'remove',
          icon: 'trash'
        }
      ]
    },
    iconColor () {
      return {
        cancel: themes[this.theme.currentTheme]['--warningColor']
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDashboardIsBeingEditedTofalse',
      'cancelNewLayout',
      'resetDashboardLayout'
    ]),
    ...mapActions([
      'updateDashboardLayout'
    ]),
    selectAction: async function (action) {
      this.currentAction = action
      if (action === 'cancel') {
        this.cancelNewLayout()
        this.setDashboardIsBeingEditedTofalse()
      }
      if (action === 'save') {
        const success = await this.updateDashboardLayout(this.dashboard.currentLayout)
        if (success) {
          this.setDashboardIsBeingEditedTofalse()
        }
      }
      if (action === 'reset') {
        const success = await this.updateDashboardLayout(this.dashboard.defaultLayout)
        if (success) {
          this.resetDashboardLayout()
          this.setDashboardIsBeingEditedTofalse()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editing-dashboard {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    &__list {
        display: flex;
        align-items: center;
        list-style: none;
        &__item {
            margin-right: 6rem;
            display: flex;
            align-items: center;
            border-radius: .5rem;
            font-size: $font-s;
            height: 4rem;
            color: var(--textColor--dark);
            cursor: pointer;
            &--warning {
                margin-right: 0;
                margin-left: 4rem;
                justify-content: flex-end;
                &:hover {
                    color: var(--warningColor) !important
                }
            }
            &.active, &:hover {
                color: var(--secondaryColor)
            }
            &.save {
                &.active, &:hover {
                    color: var(--mainColor)
                }
            }
            & span {
                    margin-left: 1rem;
            }
        }
    }
}
</style>
