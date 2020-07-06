<template>
    <div class="goal dashboard__section">
        <div class="goal__detail">
                <h2 class="dashboard__section__title">{{$t('goal')}}</h2>
                <div class="goal__detail__amount" v-if="user.goal && user.goal.amount">
                    <h3 class="goal__detail__amount__key">{{$t('amount')}}: </h3>
                    <h3 class="goal__detail__amount__value">{{user.goal.amount | amount}}</h3>
                </div>
                 <div class="goal__detail__noGoal" v-else>
                    <div @click="openBackdrop('goal')">{{$t('clickHere')}}</div><span v-if="currentLanguage === 'en'">{{$t('toSetGoal')}}</span>
                </div>
        </div>
         <div class="goal__circle">
                <Progress
                    :radius="40"
                    :strokeWidth="8"
                    :strokeColor="strokeColor"
                    :value="goalPercentage">
                </Progress>
            </div>
    </div>
</template>

<script>
import themes from '@/assets/theme'
import { mapGetters, mapMutations } from 'vuex'
import Progress from 'easy-circular-progress'
export default {
  computed: {
    ...mapGetters([
      'theme',
      'user',
      'userBalance',
      'currentLanguage'
    ]),
    goalPercentage () {
      let percent = 0
      if (this.user.goal && this.user.goal.amount) {
        percent = (this.userBalance / this.user.goal.amount) * 100
      }
      return percent
    },
    strokeColor () {
      return themes[this.theme.currentTheme]['--mainColor']
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
    ])
  },
  components: {
    Progress
  }
}
</script>

<style lang="scss">
.goal {
    display: flex;
    &__detail, &__circle {
        width: 50%;
        height: 100%;
        &__noGoal {
            font-size: $font-m;
            // background: red;
            display: flex;
            align-items: center;
            & div {
                margin-right: .35rem;
                cursor: pointer;
                color: var(--mainColor);
                &:hover {
                text-decoration: underline;
                }
            }
        }
        &__amount {
            display: flex;
            align-items: center;
            &__key {
                color: var(--textColor--dark);
                margin-right: .5rem;
            }
            &__value {
                color: var(--textColor);
                font-size: $font-m;
            }
        }
    }
    &__circle {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.vue-circular-progress .dot, .vue-circular-progress .percent__dec {
    display: none;
}
</style>
