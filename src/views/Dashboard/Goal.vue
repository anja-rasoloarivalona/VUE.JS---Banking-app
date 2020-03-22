<template>
    <div class="goal">
        <div class="goal__detail">
            <h2 class="dashboard__section__title">Goal</h2>
            <div class="goal__detail__date">
                <div class="goal__detail__date__key">Expected date:</div>
                <div class="goal__detail__date__value"><strong>{{$store.state.goal.date | short-date}}</strong></div>
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
      return (this.$store.state.balance / this.$store.state.goal.amount) * 100
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
    & h2 {
        margin-bottom: 1rem;
    }
    &__detail, &__circle {
        width: 50%;
        height: 100%;
        padding: 1rem;
        &__date {
            display: flex;
            align-items: center;
            &__key {
                color: $color-grey--dark;
                font-size: $font-xs;
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
