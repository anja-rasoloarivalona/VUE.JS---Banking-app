<template>
    <div class="goal dashboard__section">
        <div class="goal__detail">
            <h2 class="dashboard__section__title">Goal</h2>
            <div class="goal__detail__date">
                <h3 class="goal__detail__date__key">Expected date:</h3>
                <h3 class="goal__detail__date__value">{{user.goal.date | short-date}}</h3>
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
import { mapGetters } from 'vuex'
import Progress from 'easy-circular-progress'
export default {
  computed: {
    ...mapGetters([
      'theme',
      'user'
    ]),
    goalPercentage () {
      return (this.user.balance / this.user.goal.amount) * 100
    },
    strokeColor () {
      return themes[this.theme.currentTheme]['--mainColor']
    }
  },
  components: {
    Progress
  }
}
</script>

<style lang="scss">
.goal {
    display: flex;
    padding: 1rem;
    padding-left: 3rem;
    & h2 {
        margin-bottom: 1rem;
    }
    &__detail, &__circle {
        width: 50%;
        height: 100%;
        &__date {
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
