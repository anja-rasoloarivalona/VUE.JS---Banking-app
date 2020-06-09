<template>
    <div class="currency__img">
            <div class="currency__img__circle currency__img__circle--top-left"></div>
            <div class="currency__img__circle currency__img__circle--top-right"></div>
            <div class="currency__img__circle currency__img__circle--bottom-left"></div>
            <div class="currency__img__circle currency__img__circle--bottom-right"></div>
            <div class="currency__img__inner">
                <div class="currency__img__inner__circle">
                   <b>&quest;</b>
                </div>
            </div>
        </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.currency__img {
    width: 7rem;
    height: 3.5rem;
    background: #498E57;
    border-radius: .2rem;
    position: relative;
    overflow: hidden;
    &__circle {
        position: absolute;
        width: 1.3rem;
        height: 1.3rem;
        background: #498E57;
        border-radius: 50%;
        z-index: 2;
        &--top-left {
            top: -.3rem;
            left: -.3rem;
        }
        &--top-right {
            top: -.3rem;
            right: -.3rem;
        }
        &--bottom-left {
          bottom: -.3rem;
          left: -.3rem;
        }
        &--bottom-right {
          bottom: -.3rem;
          right: -.3rem
        }
    }
    &__inner {
        position: absolute;
        left: .3rem;
        top: .3rem;
        width: calc(100% - .6rem);
        height: calc(100% - .6rem);
        background: #70AF78;
        &__circle {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 3.4rem;
            height: 3.4rem;
            background: #498E57;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $color-white;
            font-size: 1.2rem;
        }
    }
}
</style>
