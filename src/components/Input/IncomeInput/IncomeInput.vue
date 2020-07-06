<template>
    <label class="income-input" v-click-outside="closeList">
        <span>{{$t('category')}}</span>
        <div
          class="income-input__select"
          :class="{
            'all-radius': !showList,
            'top-radius': showList,
            'box-shadow': showList
            }"
        >
            <div
              class="income-input__select__value"
              :class="{'bg-default': theme.isLight, 'bg-on-surfaceColor': theme.isDark, 'all-radius': !showList,'top-radius': showList}"
              @click.stop="toggleList"
            >
                <div class="income-input__select__value__icon" :style="{backgroundColor: incomesList.color}" v-if="value.iconName">
                  <fa-icon :icon="value.iconName" size="sm" :style="{ color: 'white' }"/>
                </div>
                <div>{{ $t( value.i18 ) }}</div>
            </div>
            <ul class="income-input__select__list box-shadow" v-show="showList" :class="{ dark: theme.isDark }">
                <li
                    class="income-input__select__list__item"
                    v-for="(item, key) in displayedIncomesList"
                    :key="key"
                    @click="selectIncome({value: key, ...item})"
                >
                    <div class="income-input__select__list__item__icon" :style="{backgroundColor: incomesList.color}">
                         <fa-icon :icon="item.iconName" size="sm" :style="{ color: 'white' }"/>
                    </div>
                    <div class="income-input__select__list__item__name">
                        {{ $t( item.i18 )}}
                    </div>
                </li>
            </ul>
        </div>
    </label>
       <!-- <fa-icon icon="user-secret" size="2x" :style="{ color: 'red' }"/>
        <fa-icon icon="utensils" size="2x"/> -->
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
  computed: {
    ...mapGetters([
      'theme',
      'incomesList'
    ]),
    displayedIncomesList () {
      if (this.value.name) {
        const list = { ...this.incomesList.category }
        delete list[this.value.name]
        return list
      } else {
        return this.incomesList.category
      }
    }
  },
  methods: {
    toggleList () {
      this.showList = !this.showList
    },
    closeList: function () {
      if (this.showList) {
        this.showList = false
      }
    },
    selectIncome (value) {
      this.showList = false
      this.$emit('click', value)
    }
  },
  props: {
    value: Object
  }
}
</script>

<style lang="scss" scoped>
.income-input {
    display: flex;
    flex-direction: column;
    width: 100%;
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
         &.all-radius {
          border-radius: .5rem;
        }
        &.top-radius {
          border-radius: 0;
          border-top-left-radius: .5rem;
          border-top-right-radius: .5rem;
        }
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
            // background: salmon;
            color: var(--textColor);
            width: 100%;
            // max-height: 26rem;
            // overflow-y: scroll;
            // overflow-x: hidden;
            border-bottom-left-radius: .2rem;
            border-bottom-right-radius: .2rem;
            overflow-y: scroll;
            overflow-x: hidden;
            z-index: 5;
            max-height: 24rem;
            &.dark {
              & .income-input__select__list__item {
                color: var(--textColor--dark);
                &:hover {
                   background: var(--mainColor--dark);
                   color: var(--textColor);
                }
              }
            }
            &__item {
                // height: 5rem;
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
                    // width: 3rem;
                    // height: 3rem;
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
