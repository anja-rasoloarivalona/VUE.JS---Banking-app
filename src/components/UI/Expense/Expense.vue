<template>
    <td class="expense-name">
        <div class="expense-name__content">
            <div class="expense-name__content__icon" :style="{backgroundColor: expensesList[categoryName].color}">
            <fa-icon :icon="icon" size="sm" :style="{ color: 'white' }"/>
            </div>
            <div class="expense-name__content__text" :class="{small: this.$i18n.locale === 'fr'}">
                {{ type === 'category' ? $t(expensesList[categoryName].i18) : $t(expensesList[categoryName].subcategory[subcategoryName].i18) }}
            </div>
        </div>
    </td>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'expensesList'
    ]),
    icon () {
      if (this.type === 'category') {
        return this.expensesList[this.categoryName].iconName
      } else {
        return this.expensesList[this.categoryName].subcategory[this.subcategoryName].iconName
      }
    }
  },
  props: {
    type: String, // category or subcategory
    categoryName: String,
    subcategoryName: String
  }
}
</script>

<style lang="scss"  scoped>
.expense-name {
    position: relative;
    &__content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 2rem;
          &__text.small {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 50%;
          // background: red;
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
</style>
