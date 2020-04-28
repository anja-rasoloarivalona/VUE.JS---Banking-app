<template>
    <div class="welcome">
        <h1>Welcome Anja!</h1>
        <div class="welcome__text">Let's setup your account</div>
        <app-btn normal primary @click.native="$emit('hideWelcome')">Setup</app-btn>
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
background: $color-white;
border-radius: .5rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 2rem 0;
& h1 {
    color: $color-primary;
}
&__text {
    margin: 2rem 0;
    font-size: $font-m;
    color: $color-grey--dark;
}
}
</style>
