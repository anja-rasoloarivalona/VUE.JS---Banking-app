<template>
    <div class="editing-dashboard">
        <ul class="editing-dashboard__main">
            <li class="editing-dashboard__main__item" v-for="action in dashboardCta" :key="action.value" :class="{active: action.value === currentAction, save: action.value === 'save'}">
                <fa-icon :icon="action.icon" size="lg" />
                <span>{{$t(action.i18)}}</span>
            </li>
        </ul>
        <li class="editing-dashboard__cancel editing-dashboard__main__item" @click="setDashboardIsBeingEditedTofalse">
            <fa-icon icon="arrow-right" size="lg"/>
            <span>Cancel</span>
        </li>
    </div>
</template>

<script>
import themes from '@/assets/theme'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      currentAction: 'move'
    }
  },
  computed: {
    ...mapGetters([
      'theme'
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
      'setDashboardIsBeingEditedTofalse'
    ])
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
    &__main {
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
    &__cancel {
        &.editing-dashboard__main__item {
            margin-right: 0;
            justify-content: flex-end;
        }
        &:hover {
            color: var(--warningColor)
        }
    }
}
</style>
