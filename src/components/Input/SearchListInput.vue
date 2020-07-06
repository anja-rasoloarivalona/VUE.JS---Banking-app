<template>
    <label :for="id" class="custom-label"  @mouseenter="openList" @mouseleave="closeList">
      <span v-if="id">{{ id }}</span>
      <div
        :id="id"
        class="select"
        :class="{
          'bg-default': theme.isLight,
          'bg-on-surfaceColor': theme.isDark,
          'box-shadow': showList,
          'all-radius': !showList,
          'top-radius': showList,
        }"
        >
          <div class="select__value" :class="{active: showList, 'bg-white': bgWhite}" >
                <input
                    :id="id"
                    :placeholder="placeholder"
                    @input="textChange($event.target.value)"
                    :value="value"
                    class="select__value__input"
                    @click.stop="openList"
                />
              <!-- <div v-if="value !== ''">{{ i18 ? $t(value.i18) : value }}</div> -->
              <!-- <div v-else class="select__value__placeholder">{{ placeholder }}</div> -->
          </div>
          <ul
            class="select__list box-shadow"
            v-show="showList"
            :style="{maxHeight: `${listMaxHeight}vh`}">
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
      showList: false,
      displayedOptions: []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  watch: {
    displayedOptions: function (v) {
    }
  },
  mounted () {
    this.displayedOptions = this.options
  },
  methods: {
    selectOption (value) {
      this.closeList()
      if (value !== '') {
        this.displayedOptions = this.options.filter(option => option !== value)
        this.$emit('change', value)
      }
    },
    textChange (value) {
      this.showList = true
      if (value !== '') {
        this.displayedOptions = this.options.filter(option => {
          return option.toLowerCase().includes(value.toLowerCase())
        })
      }

      this.$emit('change', value)
    },
    openList () {
      if (!this.showList) {
        this.showList = true
      }
    },
    closeList: function () {
      if (this.showList) {
        this.showList = false
      }
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
    ])
  },
  props: {
    value: [String, Number, Object],
    options: {
      type: Array,
      required: true
    },
    id: String,
    bgWhite: Boolean,
    bgGrey: Boolean,
    listMaxHeight: Number,
    placeholder: String
  }
}
</script>

<style lang="scss" scoped>
.custom-label {
  display: flex;
  flex-direction: column;
//   width: 100%;
  // margin-bottom: 2rem;
  ::-webkit-scrollbar {
    width: 0em;
  }
  & span {
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
        &::after {
            content: '';
            position: absolute;
            width: .7rem;
            height: .5rem;
            background: var(--textColor--dark);
            right: 1rem;
            clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
        &__input {
            height: 4rem;
            width: 90%;
            color: var(--textColor);
            border: none;
             border-radius: 0.5rem;
            background: transparent;
            &:focus {
            outline: none;
            }
        }
    }
    &__list {
        position: absolute;
        top: 4rem;
        left: 0;
        background: var(--surfaceColor);
        // border: 1px solid var(--lineColor);
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
