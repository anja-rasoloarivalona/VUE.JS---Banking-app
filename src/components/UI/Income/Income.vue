<template>
    <td class="income-name">
        <div class="income-name__content">
            <div class="income-name__content__icon" :style="{backgroundColor: incomesList.color}">
            <fa-icon :icon="income.iconName" size="sm" :style="{ color: 'white' }"/>
            </div>
            <div class="income-name__content__text">
                {{  $t(income.i18) }}
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
    ])
  },
  props: {
    income: {
      key: String,
      i18: String,
      iconName: String
    }
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
