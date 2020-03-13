<template>
    <div class="select" v-click-outside="closeList">
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
    },
    closeList: function () {
      this.showList = false
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  created () {
    this.selected = this.options[0]
  }
}
</script>

<style lang="scss" scoped>
.select {
    width: 15rem;
    background: $color-grey--dark;
    position: relative;
    &__value {
        height: 3rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            width: .7rem;
            height: .5rem;
            background: $color-grey--light;
            right: 1rem;
            clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
    }
    &__list {
        position: absolute;
        top: 3rem;
        left: 0;
        border: 1px solid $color-grey--dark;
        width: 100%;
        &__item {
            height: 3rem;
            display: flex;
            align-items: center;
            padding-left: 1rem;
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
