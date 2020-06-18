<template>
    <td class="income-name">
        <div class="income-name__content">
            <div class="income-name__content__icon" :style="{backgroundColor: incomesList.color}">
            <fa-icon :icon="icon" size="sm" :style="{ color: 'white' }"/>
            </div>
            <div class="income-name__content__text">
                {{  type === 'income' ? $t('income') : $t(incomesList.category[income.subcategory].i18) }}
            </div>
        </div>
    </td>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'incomesList'
    ]),
    icon () {
      if (this.type === 'income') {
        return this.incomesList.iconName
      } else {
        return this.incomesList.category[this.income.subcategory].iconName
      }
    }
  },
  mounted () {
    // console.log('income', this.income)
  },
  props: {
    income: Object,
    type: String // category or subcategory
  }
}
</script>

<style lang="scss"  scoped>
.income-name {
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
        &__text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 45%;
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
