<template>
    <div class="goal">
        <div class="goal__detail">
            <h2 class="dashboard__section__title">Goal</h2>
            <div class="goal__detail__date">
                <h3 class="goal__detail__date__key">Expected date:</h3>
                <h3 class="goal__detail__date__value">{{$store.state.user.goal.date | short-date}}</h3>
            </div>
        </div>
        <div class="goal__circle">
            <Progress :radius="40" :strokeWidth="8" strokeColor="brown" :value="goalPercentage">
            </Progress>
        </div>
    </div>
</template>

<script>
import Progress from 'easy-circular-progress'
export default {
  computed: {
    goalPercentage () {
      return (this.$store.state.user.balance / this.$store.state.user.goal.amount) * 100
    }
  },
  components: {
    Progress
  }
}
</script>

<style lang="scss">
.goal {
    background: $color-white;
    display: flex;
    height: 11rem;
    max-height: 11rem;
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
                color: $color-grey--main;
                margin-right: .5rem;
            }
            &__value {
                color: $color-primary;
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
