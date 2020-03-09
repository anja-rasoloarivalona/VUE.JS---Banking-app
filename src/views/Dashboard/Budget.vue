<template>
  <div class="budget">
    <div v-for="item in budget" :key="item.id" class="budget__item">
        <div class="budget__item__key">{{ item.id }}</div>
        <div class="budget__item__maxbar" :style="{ width:  item.max / max * 100 + '%' }">
            <div class="budget__item__usedbar" :style="{width: item.used * oneDollarWidth + 'em'}">
                ${{ item.used | amount }}
            </div>
        </div>
        <div class="budget__item__max">${{ item.max | amount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      budget: [
        {
          id: 'food',
          used: 350,
          max: 450
        },
        {
          id: 'entertainement',
          used: 300,
          max: 350
        },
        {
          id: 'movie',
          used: 40,
          max: 120
        }
      ]
    }
  },
  computed: {
    max () {
      let max = 0
      this.budget.forEach(item => {
        if (item.max > max) {
          max = item.max
        }
      })
      return max
    },
    oneDollarWidth () {
      let max = 0
      this.budget.forEach(item => {
        if (item.max > max) {
          max = item.max
        }
      })
      const oneDollarWidth = 100 / max
      return oneDollarWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.budget {
    background: $color-white;
    padding: 1.5rem;
    border-radius: 2rem;
    &__item {
    display: flex;
    align-items: center;
    margin: 3rem 0;
        &__key {
            width: 10rem;
            min-width: 10rem;
            text-transform: capitalize;
            font-size: $font-s;
            color: $color-grey--dark;
        }
        &__maxbar {
            height: 2rem;
            max-width: 100%;
            background: $color-grey--main;
            position: relative;
            border-radius: .5rem;
            overflow: hidden;
        }
        &__usedbar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: $color-primary;
            display: flex;
            align-items: center;
            padding-left: 2rem;
            color: $color-white;
        }
        &__max {
            margin-left: 2rem;
            color: $color-primary
        }
    }
}
</style>
