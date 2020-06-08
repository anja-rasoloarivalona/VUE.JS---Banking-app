<template>
    <div class="toggle-list" @mouseenter="showList = true" @mouseleave="showList= false">
        <div class="toggle-list__value">
            <slot name="value"/>
            <app-icon name="arrow-drop" size="large" color="dark" />
        </div>
        <div class="toggle-list__bridge">
                <app-icon name="arrow-drop" size="extra-large" color="white" v-if="showList"/>
        </div>
        <slot name="list" v-if="showList" />
    </div>
</template>

<script>
export default {
  data () {
    return {
      showList: false
    }
  }
}
</script>

<style lang="scss">
.toggle-list {
    font-size: $font-s;
    color: var(--textColor--dark);
    position: relative;
    display: flex;
    flex-direction: column;
    // margin: 0 1.5rem;
    &__value {
        display: flex;
        align-items: center;
        & span {
            margin-right: 1rem;
        }
    }
    &__bridge {
        position: absolute;
        width:100%;
        height: 1rem;
        right: 0;
        // background: red;
        display: flex;
        justify-content: flex-end;
        top: 100%;
        z-index: 2;
        & svg {
            // background: blue;
            transform: translateX(.5rem) translateY(-.7rem) rotate(180deg);
        }
    }
    &__list {
        list-style: none;
        background-color: $color-white;
        top: 3rem;
        left: -3rem;
        width: 13rem;
        position: absolute;
        &__item {
            padding: 1rem 2rem;
            cursor: pointer;
            color: var(--textColor--dark);
            &:hover {
                color: var(--mainColor)
            }
        }
    }
}
</style>
