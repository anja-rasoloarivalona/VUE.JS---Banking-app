<template>
  <div class="profile-goal">
    <div class="profile-goal__details">
      <h1>{{$t('goal')}}</h1>
      <div class="profile-goal__details__item">
        <div class="profile-goal__details__item__key">
          {{$t('amount')}}
        </div>
        <div class="profile-goal__details__item__value">
          {{user.goal.amount | amount}}
        </div>
      </div>
      <div class="profile-goal__details__item">
        <div class="profile-goal__details__item__key">
          {{$t('expectedDate')}}
        </div>
        <div class="profile-goal__details__item__value">
          <span v-if="user.goal.date && user.goal.date !== 'null'">{{user.goal.date | short-date }}</span>
          <span v-else>-</span>
        </div>
      </div>
    </div>
    <div class="profile-goal__chart">
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
// import DoughnutChart from '@/components/Charts/Doughnut'
import themes from '@/assets/theme'
import Progress from 'easy-circular-progress'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: null,
      chartStyles: {
        height: '130px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'user',
      'userBalance'
    ]),
    goalPercentage () {
      return (this.userBalance / this.user.goal.amount) * 100
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

<style lang="scss" scoped>
.profile-goal {
  display: flex;
  align-items: center;
  margin-top: 6rem;
  margin-bottom: 4rem;
  // background: red;
  &__details {
    // width: 65%;
    // background: yellow;
    margin-right: 5rem;
    & h1 {
      margin-bottom: 2rem;
      color: var(--textColor--dark)
    }
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 30rem;
      font-size: $font-m;
      margin-bottom: 2rem;
      &__key {
        height: 100%;
        width: 15rem;
        color: var(--textColor--dark);
      }
    }
  }
  &__chart {
    // width: 35%;
    // background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.vue-circular-progress .dot, .vue-circular-progress .percent__dec {
    display: none;
}
</style>
