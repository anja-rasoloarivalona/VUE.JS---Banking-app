<template>
    <td class="expense-name">
        <div class="expense-name__content">
            <div class="expense-name__content__icon" :style="{backgroundColor: data.color}">
            <fa-icon :icon="data.icon" size="sm" :style="{ color: 'white' }"/>
            </div>
            <div class="expense-name__content__text">
                {{ type === 'category' ? this.categoryName : this.subcategoryName}}
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
    data () {
      const data = {
        icon: '',
        color: ''
      }
      this.expensesList.find((category, catIndex) => {
        if (category.name === this.categoryName) {
          data.color = this.expensesList[catIndex].color
          if (this.type === 'category') {
            data.icon = this.expensesList[catIndex].iconName
          } else {
            this.expensesList[catIndex].subcategory.find((subcat, subcatIndex) => {
              if (subcat.name === this.subcategoryName) {
                data.icon = this.expensesList[catIndex].subcategory[subcatIndex].iconName
              }
            })
          }
        }
      })
      return data
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
