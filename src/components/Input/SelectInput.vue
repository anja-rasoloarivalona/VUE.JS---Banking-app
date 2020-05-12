<template>
    <label :for="id" class="label">
      <span v-if="id">{{ id }}</span>
      <div
        class="select"
        :class="{
          'bg-white': currentTheme.includes('light'),
          'bg-on-surfaceColor': currentTheme.includes('dark') ,
          'all-radius': !showList,
          'top-radius': showList}"
        v-click-outside="closeList">
          <div class="select__value" :class="{active: showList}" @click.stop="showList = !showList">{{ value }}</div>
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'currentTheme'
    ])
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
.label {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  & span {
        width: 10rem;
        margin-bottom: 0.5rem;
        font-size: $font-m;
        color: var(--textColor--dark);
    }
}
.select {
    width: 100%;
    color: var(--textColor);
    position: relative;
    &.all-radius {
      border-radius: .5rem;
    }
    &.top-radius {
      border-radius: 0;
      border-top-left-radius: .5rem;
      border-top-right-radius: .5rem;
    }
    &.bg-white {
      & .select {
        &__list {
          &__item {
            &:hover {
              background: whitesmoke;
            }
          }
        }
      }
    }
    &__value {
        height: 4rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        position: relative;
        font-size: $font-m;
        cursor: pointer;
        &.active {
          // border-top-left-radius: .5rem;
          // border-top-right-radius: .5rem;
          // border: 1px solid var(--mainColor);
          // border-bottom: 1px solid var(--mainColor);
          // box-sizing: content-box;
          // border-bottom: none;
        }
        &::after {
            content: '';
            position: absolute;
            width: .7rem;
            height: .5rem;
            background: var(--textColor--dark);
            right: 1rem;
            clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
    }
    &__list {
        position: absolute;
        top: 4.1rem;
        left: 0;
        border: 1px solid var(--mainColor);
        // border-top: none;
        background: var(--surfaceColor);
        color: var(--textColor);
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
                // background: var(--on-surfaceColor);
            }
            &.active {
                background: var(--mainColor);
                color: $color-white;
                 &:hover {
                  background: var(--mainColor) !important;
                }
            }
        }
    }
}
</style>
