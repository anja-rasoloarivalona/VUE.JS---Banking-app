<template>
    <label class="category-input">
        <span>{{$t('subcategory')}}</span>
        <div class="category-input__select" :class="{
            'all-radius': !showList,
            'top-radius': showList,
            'box-shadow': showList
            }">
            <div
              class="category-input__select__value"
              :class="{'bg-default': theme.isLight, 'bg-on-surfaceColor': theme.isDark, disabled: !category, 'all-radius': !showList,'top-radius': showList, }"
              @click.stop="toggleList"
            >
                <div class="category-input__select__value__icon" :style="{backgroundColor: category.color}" v-if="value.iconName">
                  <fa-icon :icon="value.iconName" size="sm" :style="{ color: 'white' }"/>
                </div>
               <div>{{ $t(value.i18) }}</div>
            </div>
            <ul class="category-input__select__list  box-shadow" v-if="showList && category" :class="{light: theme.isLight, dark: theme.isDark}">
                <li
                    class="category-input__select__list__item"
                    v-for="(item, key) in displayedSubcategoryList" :key="key"
                    @click="selectSubcategory({name: key, ...item})"
                >
                    <div class="category-input__select__list__item__icon" :style="{backgroundColor: category.color}">
                         <fa-icon :icon="item.iconName" size="sm" :style="{ color: 'white' }"/>
                    </div>
                    <div class="category-input__select__list__item__name">
                        {{ $t(item.i18)}}
                    </div>
                </li>
            </ul>
        </div>
        <slot />
    </label>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      showList: false,
      expensesList: [
        {
          name: 'Food and Drinks',
          iconName: 'utensils'
        }
      ]
    }
  },
  mounted () {
    // console.log('subaca', this.category)
  },
  model: {
    prop: 'value',
    event: 'click'
  },
  watch: {
    category: function (next, prev) {
      if (!prev || next.i18 !== prev.i18) {
        this.showList = true
      }
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ]),
    displayedSubcategoryList () {
      if (this.value.name) {
        const list = { ...this.category.subcategory }
        delete list[this.value.name]
        return list
      } else {
        return this.category.subcategory
      }
    }
  },
  methods: {
    toggleList () {
      this.showList = !this.showList
    },
    selectSubcategory (value) {
      this.showList = false
      this.$emit('click', value)
    }
  },
  props: {
    value: Object,
    category: Object
  }
}
</script>

<style lang="scss" scoped>
.category-input {
    display: flex;
    flex-direction: column;
    & span {
        width: 10rem;
        margin-bottom: 0.5rem;
        font-size: $font-m;
        color: var(--textColor--dark)
    }
    &__select {
        width: 100%;
        color: var(--textColor);
        position: relative;
        &__value {
            // background: brown;
            height: 4rem;
            display: flex;
            align-items: center;
            padding-left: 1rem;
            position: relative;
            font-size: $font-m;
            cursor: pointer;
            &.all-radius {
              border-radius: .5rem;
            }
            &.top-radius {
              border-radius: 0;
              border-top-left-radius: .5rem;
              border-top-right-radius: .5rem;
            }
            &.disabled {
              cursor: not-allowed;
            }
            &__icon {
              border-radius: 50%;
              width: 2rem;
              height: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 1rem;
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
            top: 4rem;
            left: 0;
            background: var(--surfaceColor);
            color: var(--textColor);
            width: 100%;
            border-bottom-left-radius: .2rem;
            border-bottom-right-radius: .2rem;
            overflow-y: scroll;
            overflow-x: hidden;
            z-index: 5;
            &.dark {
              & .category-input__select__list__item {
                color: var(--textColor--dark);
                &:hover {
                   background: var(--mainColor--dark);
                   color: var(--textColor);
                }
              }
            }
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
                &__icon {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                }
            }
        }
    }
}
</style>
