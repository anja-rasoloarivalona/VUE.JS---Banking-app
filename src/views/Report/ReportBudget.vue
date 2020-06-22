<template>
    <div class="report-budget">
        <h1 class="report-budget__title">Budget</h1>
        <div class="report-budget__content">
          <div class="report-budget__content__empty">
              <p>The statistics concerning your variable expenses will be displayed here</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.report-budget {
  min-height: 30vh;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  &__title {
    margin-bottom: 3rem;
    color: var(--textColor--dark);
  }
  &__content {
    // background: red;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-size: $font-m;
    color: var(--textColor--dark);
    &__empty {
      // background: green;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      & p {
        transform: translateY(-3rem);
        // background: red;
      }
    }
  }
}
</style>
