<template>
    <label class="category-input">
        <span>Category</span>
        <div
          class="category-input__select"
          :class="{
            'all-radius': !showList,
            'top-radius': showList,
            'box-shadow': showList
            }"
        >
            <div class="category-input__select__value"  :class="{'bg-default': theme.isLight, 'bg-on-surfaceColor': theme.isDark, 'bg-white': bgWhite}" @click.stop="toggleList">{{ value }}</div>
            <ul class="category-input__select__list" v-show="showList" :style="{boxShadow: theme.isDark ? 'box-shadow: 1px 5px 12px -1px rgba(15,15,15,1)' : '1px 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}">
                <li class="category-input__select__list__item" v-for="item in expensesList" :key="item.name">
                    <div class="category-input__select__list__item__icon" :style="{backgroundColor: item.color}">
                         <fa-icon :icon="item.iconName" size="lg" :style="{ color: 'white' }"/>
                    </div>
                    <div class="category-input__select__list__item__name">
                        {{ item.name}}
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
      showList: false,
      expensesList: [
        {
          name: 'Food and Drinks',
          iconName: 'utensils',
          color: '#E62E3D'
        },
        {
          name: 'Shopping',
          iconName: 'shopping-bag',
          color: '#64B5F6'
        },
        {
          name: 'Housing',
          iconName: 'home',
          color: '#EE9E1E'
        },
        {
          name: 'Transport',
          iconName: 'bus-alt',
          color: '#B0BFC6'
        },
        {
          name: 'Leisure',
          iconName: 'users',
          color: '#AB46BC'
        },
        {
          name: 'Multimedia',
          iconName: 'tv',
          color: '#2346A2'
        },
        {
          name: 'Investment',
          iconName: 'chart-line',
          color: '#E73F7A'
        },
        {
          name: 'Health',
          iconName: 'first-aid',
          color: '#6BDD16'
        }
      ]
    }
  },
  model: {
    prop: 'value',
    event: 'click'
  },
  computed: {
    ...mapGetters([
      'theme'
    ])
  },
  methods: {
    toggleList () {
      this.showList = !this.showList
      console.log('toggling list', this.showList)
    }
  },
  props: {
    value: [String, Number]
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
                &__icon {
                    width: 3rem;
                    height: 3rem;
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
