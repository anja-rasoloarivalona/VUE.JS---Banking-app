<template>
    <label :for="id">
      <span v-if="id">{{ id }}</span>
      <div
        class="select"
        :class="{'bg-grey': bgGrey, 'all-radius': !showList, 'top-radius': showList}"
        v-click-outside="closeList">
          <div class="select__value" @click.stop="showList = !showList">{{ value }}</div>
          <ul class="select__list" v-show="showList">
              <li v-for="(option, index) in options"
                  :key="index" class="select__list__item"
                  :class="{active: option === value}"
                  @click="selectOption(option)">
                  {{ option }}
              </li>
          </ul>
      </div>
    </label>
</template>

<script>
export default {
  data () {
    return {
      showList: false
    }
  },
  model: {
    prop: 'value',
    event: 'click'
  },
  methods: {
    selectOption (value) {
      this.showList = false
      this.$emit('click', value)
    },
    closeList: function () {
      this.showList = false
    }
  },
  props: {
    value: [String, Number],
    options: {
      type: Array,
      required: true
    },
    id: String,
    bgGrey: Boolean
  }
}
</script>

<style lang="scss" scoped>
label {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  & span {
        width: 10rem;
        margin-bottom: 0.5rem;
        font-size: $font-m;
        color: var(--app-title-color-secondary);
    }
}
.select {
    width: 100%;
    background: var(--app-item-bg);
    color: var(--app-text-color);
    position: relative;
    &.bg-grey {
      background: $color-grey--light;
    }
    &.all-radius {
      border-radius: .5rem;
    }
    &.top-radius {
      border-top-left-radius: .5rem;
      border-top-right-radius: .5rem;
    }
    &__value {
        height: 4rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        position: relative;
        font-size: $font-m;
        cursor: pointer;
        &::after {
            content: '';
            position: absolute;
            width: .7rem;
            height: .5rem;
            background: $color-grey--dark;
            right: 1rem;
            clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
    }
    &__list {
        position: absolute;
        top: 4rem;
        left: 0;
        border: 1px solid $color-grey--dark;
        background: var(--app-item-bg);
        color: var(--app-text-color);
        width: 100%;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        overflow: hidden;
        z-index: 5;
        &__item {
            height: 4rem;
            display: flex;
            align-items: center;
            padding-left: 1rem;
            font-size: $font-m;
            cursor: pointer;
            &:hover {
                // background: $color-grey--light;
            }
            &.active {
                background: var(--app-color-main);
                color: var(--app-text-color);
            }
        }
    }
}
</style>
