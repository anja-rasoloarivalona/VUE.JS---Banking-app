<template>
    <div class="setup__sidenav">
        <h1 class="setup__sidenav__title">Setup</h1>
        <ul class="setup__sidenav__stepsList">
                <li class="setup__sidenav__stepsList__item">
                    <div class="setup__sidenav__stepsList__item__text">Wallet</div>
                    <app-icon name="wallet" size="large" color="primary"/>
                </li>
                <div class="setup__sidenav__stepsList__bar"></div>
                <li class="setup__sidenav__stepsList__item">
                    <div class="setup__sidenav__stepsList__item__text">Budget</div>
                    <app-icon name="budget" size="large" color="grey"/>
                </li>
                <div class="setup__sidenav__stepsList__bar"></div>
                <li class="setup__sidenav__stepsList__item">
                    <div class="setup__sidenav__stepsList__item__text">Savings</div>
                    <app-icon name="savings-plan" size="large" color="grey"/>
                </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.setup {
    &__sidenav {
        position: fixed;
        height: 100vh;
        width: 25rem;
        background: $color-primary;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &__title {
            text-align: center;
            padding: 4rem 0;
            color: $color-white;
        }
        &__stepsList {
            display: flex;
            flex-direction: column;
            align-items: center;
            list-style: none;
            width: 100%;
            margin-top: 7rem;
            flex: 1;
            & > * {
                transform: translateX(2rem);
            }
            &__item {
                position: relative;
                width: 6rem;
                height: 6rem;
                border-radius: 50%;
                border: 5px solid $color-grey--main;
                background: $color-white;
                display: flex;
                align-items: center;
                justify-content: center;
                &__text {
                    position: absolute;
                    right: 6.5rem;
                    top: 0;
                    width: 10rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    color: $color-white;
                    font-size: $font-m;
                }
            }
            &__bar {
                width: .5rem;
                height: 10rem;
                background: $color-grey--main;
            }
        }
    }
}
</style>
