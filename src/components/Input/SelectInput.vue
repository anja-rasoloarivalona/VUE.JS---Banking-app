<template>
    <label :for="id" class="label" :class="{row: row, showScrollBar: showScrollBar}" v-click-outside="closeList">
      <span v-if="id">{{ id }}</span>
      <div
        :id="id"
        class="select"
        :class="{
          'bg-default': theme.isLight,
          'bg-on-surfaceColor': theme.isDark,
          'all-radius': !showList,
          'top-radius': showList,
        }"
        >
          <div
            class="select__value"
            :class="{active: showList, 'disabled': isDisabled,  'bg-white': bgWhite}"
            @click.stop="toggleList">
              <div v-if="value !== ''">{{ value }}</div>
              <div v-else class="select__value__placeholder">{{ placeholder }}</div>
          </div>
          <ul
            class="select__list"
            v-show="showList"
            :style="{maxHeight: `${listMaxHeight}vh`, boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}">
              <li v-for="(option, index) in displayedOptions"
                  :key="index" class="select__list__item"
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
    },
    toggleList () {
      if (!this.isDisabled) {
        this.showList = !this.showList
      }
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ]),
    displayedOptions () {
      return this.options.filter(option => option !== this.value)
    }
  },
  props: {
    value: [String, Number],
    options: {
      type: Array,
      required: true
    },
    id: String,
    bgWhite: Boolean,
    bgGrey: Boolean,
    row: Boolean,
    isDisabled: Boolean,
    listMaxHeight: Number,
    showScrollBar: Boolean,
    placeholder: String
  }
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  ::-webkit-scrollbar {
    width: 0em;
  }
  &.showScrollBar {
    ::-webkit-scrollbar {
        width: 1em;
    }
    ::-webkit-scrollbar-track {
        background-color: rgb(218, 218, 218);
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--textColor--dark);
        border-radius: 2px;
    }
  }
  &.row {
    flex-direction: row;
    align-items: center;
  }
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
    &__value {
        height: 4rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        position: relative;
        font-size: $font-m;
        cursor: pointer;
        &__placeholder {
          color: var(--textColor--dark)
        }
        &.bg-white {
          background: $color-white;
        }
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
        &.disabled {
          color: var(--textColor--dark);
          cursor: not-allowed;
          &::after {
            display: none;
          }
        }
    }
    &__list {
        position: absolute;
        top: 4.1rem;
        left: 0;
        background: var(--surfaceColor);
        color: var(--textColor);
        width: 100%;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index: 5;
        &__item {
            height: 4rem;
            display: flex;
            align-items: center;
            padding-left: 1rem;
            font-size: $font-m;
            cursor: pointer;
            &:hover {
              background: var(--mainColor--light);
            }
        }
    }
}

</style>
