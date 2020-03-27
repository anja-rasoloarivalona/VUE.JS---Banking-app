<template>
    <div class="monthly">
        <h2 class="dashboard__section__title">Monthly report</h2>
        <div class="monthly__details">
            <div class="monthly__details__item monthly__details__item--income">
                <h3>Income</h3>
                <div class="monthly__details__item__amount">+ $12</div>
            </div>
            <div class="monthly__details__item monthly__details__item--expense">
                <h3>Expense</h3>
                <div class="monthly__details__item__amount">- $12</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.monthly {
    background: $color-white;
    height: 11rem;
    max-height: 11rem;
    padding: 1rem;
    & h2 {
        margin-bottom: 1rem;
    }

    &__details {
        display: flex;
        &__item {
            width: 100%;
            & h3 {
                margin-bottom: 1rem;
            }
            &--income {
               & h3, & div {
                   color: $color-primary
                }
            }
            &--expense{
               & h3 , & div {
                   color: red
                }
            }
        }
    }
}
</style>
