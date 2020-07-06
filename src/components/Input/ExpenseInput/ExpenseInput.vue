<template>
    <label class="category-input-container">
        <main-category v-model="value.category" :expensesList="expensesList" />
        <sub-category v-model="value.subcategory" :category="category" />
    </label>
</template>

<script>
import { mapGetters } from 'vuex'
import MainCategory from './MainCategory'
import SubCategory from './SubCategory'
export default {
  computed: {
    ...mapGetters([
      'expensesList'
    ]),
    category () {
      return this.expensesList[this.value.category.name]
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
