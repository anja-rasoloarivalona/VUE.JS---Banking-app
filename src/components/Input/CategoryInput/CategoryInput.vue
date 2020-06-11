<template>
    <label class="category-input-container">
        <main-category v-model="value.category" :expensesList="expensesList" />
        <sub-category v-model="value.subcategory" :subcategoryList="subcategoryList" :color="value.category.color" />
    </label>
</template>

<script>
import { mapGetters } from 'vuex'
import MainCategory from './MainCategory'
import SubCategory from './SubCategory'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'expensesList'
    ]),
    subcategoryList () {
      let res = []
      this.expensesList.find((expense, index) => {
        if (expense.name === this.value.category.name) {
          res = this.expensesList[index].subcategory
        }
      })
      return res
    }
  },
  props: {
    value: Object
  },
  components: {
    MainCategory,
    SubCategory
  }
}
</script>

<style lang="scss" scoped>
.category-input-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    & .category-input {
        width: 25rem;
        &:first-child {
            margin-right: 1rem;
        }
    }
}
</style>
