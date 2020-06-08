<template>
    <div class="welcome">
        <h1>{{$t('welcome')}} {{this.$store.state.auth.userName}}!</h1>
        <div class="welcome__text">{{$t('letsSetupYourAccount')}} &#x1F600;</div>
        <app-btn normal primary @click.native="$emit('hideWelcome')">{{$t('next')}}</app-btn>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.welcome {
position: absolute;
width: 60rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: $color-white;
border-radius: .5rem;
padding: 2rem 0;
    & h1 {
        color: $color-primary;
    }
    &__text {
        margin: 2rem 0;
        font-size: $font-l;
        color: $color-grey--dark;
    }
}
</style>
