<template>
    <div class="report">
      <report-header></report-header>
      <div class="report__item">
            <div class="report__item__title">
                <h2>Incomes</h2>
            </div>
            <div class="report__item__details">
            </div>
        </div>
    </div>
</template>

<script>
import ReportHeader from './ReportHeader'
export default {
  components: {
    ReportHeader
  }

}
</script>

<style lang="scss" scoped>
.report {
  margin-bottom: 3rem;
  &__item {
    padding: 2rem;
    border: 1px solid var(--lineColor);
    margin-bottom: 2rem;
    border-radius: .5rem;
    &__title {
            text-transform: uppercase;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            & h2 {
                // background: red;
                width: 13rem
            }
        }
  }
}
</style>
