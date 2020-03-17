<template>
    <label :for="id">
      <span>{{ id }}</span>
      <div
        class="select"
        :class="{'bg-white': bgWhite, 'all-radius': !showList, 'top-radius': showList}"
        v-click-outside="closeList">
          <div class="select__value" @click.stop="showList = !showList">{{ selected }}</div>
          <ul class="select__list" v-show="showList">
              <li v-for="(option, index) in options"
                  :key="index" class="select__list__item"
                  :class="{active: option === selected}"
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
      showList: false,
      selected: null
    }
  },
  methods: {
    selectOption (value) {
      this.showList = false
      this.selected = value
      this.$emit('selectInput', value)
    },
    closeList: function () {
      this.showList = false
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    id: String,
    bgWhite: Boolean
  },
  created () {
    this.selected = this.options[0]
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
        color: $color-grey--dark;
    }
}
.select {
    width: 100%;
    background: $color-grey--light;
    position: relative;
    &.bg-white {
      background: $color-white;
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
        background: $color-white;
        width: 100%;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        overflow: hidden;
        &__item {
            height: 4rem;
            display: flex;
            align-items: center;
            padding-left: 1rem;
            font-size: $font-m;
            cursor: pointer;
            &:hover {
                background: $color-grey--light;
            }
            &.active {
                background: $color-primary;
                color: $color-white;
            }
        }
    }
}
</style>
