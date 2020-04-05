<template>
    <div class="color">
        <span>Color</span>
        <div class="color__select"  v-click-outside="closeList">
            <div class="color__select__value"
                :style="{background: value}"
                @click="showList = !showList">
            </div>
            <ul class="color__select__list" v-if="showList">
                <li
                  v-for="(color, index) in colorsList"
                  :key="index"
                  class="color__select__list__item"
                  :style="{background: color}"
                  @click="selectColor(color)"
                >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      showList: false,
      colorsList: ['Brown', 'Chocolate', 'Coral', 'Crimson', 'DarkCyan', 'DarkBlue', 'FireBrick', 'OrangeRed', 'Teal']
    }
  },
  mounted () {
    if (this.parentColorsList) {
      this.colorsList = this.parentColorsList
    }
  },
  model: {
    props: 'value',
    event: 'click'
  },
  methods: {
    selectColor (value) {
      this.showList = false
      this.$emit('click', value)
    },
    closeList: function () {
      this.showList = false
    }
  },
  props: {
    value: String,
    parentColorsList: Array
  }
}
</script>

<style lang="scss">
.color {
    width: 30%;
    display: flex;
    align-items: center;
        & span {
          width: 10rem;
          font-size: $font-m;
          color: $color-grey--dark;
        }
        &__select {
          position: relative;
          &__value {
            width: 2em;
            height: 2rem;
            border: 1px solid $color-grey--main;
            border-radius: .3rem;
            cursor: pointer;
          }
          &__list {
            position: absolute;
            top: 0rem;
            left: 6rem;
            list-style: none;
            width: 6rem;
            display: grid;
            border-radius: .5rem;
            overflow: hidden;
            grid-template-columns: repeat(auto-fit, 2rem);
            grid-auto-rows: 2rem;
            &__item {
              width: 2rem;
              height: 2rem;
              cursor: pointer;
            }
          }
        }
}
</style>
