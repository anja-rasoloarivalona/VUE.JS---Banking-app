<template>
    <div class="sidebar">
        <div class="sidebar__header"></div>
        <ul class="sidebar__list">
            <li class="sidebar__list__item">
                <div class="sidebar__list__item__title">
                    <h2>Upcoming</h2>
                    <div class="sidebar__list__item__subtitle">
                        <div>Rent</div>
                        <div>4/01/2020</div>
                    </div>
                </div>
                <div class="sidebar__list__item__details">
                    <div class="sidebar__list__item__details__amount">$640</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>

.sidebar {
    position: fixed;
    width: 25rem;
    height: 100vh;
    background: $color-primary;
    padding: 0 1rem;
    &__header {
        height: 9rem;
        margin-bottom: 3rem;
    }
    &__list {
        &__item {
            padding: 2rem 1rem;
            border-radius: 1rem;
            background: $color-white;
            display: flex;
            align-items: center;

            &__title {
                display: flex;
                flex-direction: column;
                & h2 {
                    height: 3rem;
                    display: flex;
                    align-items: center;
                    // color: $color-primary;
                }
            }
            &__subtitle {
                display: flex;
                color: $color-grey--main;
                font-size: $font-s;
                & div:first-child {
                    margin-right: .5rem;
                }
            }
            &__details {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                width: 100%;
                &__amount {
                    // color: $color-primary;
                    font-size: $font-xl;
                    padding-right: 1rem;
                    font-weight: 600;
                }
            }
        }
    }
}

</style>
