<template>
    <div class="success">
        <div>Welcome Strix!</div>
        <div class="success__board">
            <h2>Congratulations! Your account has been created successfully</h2>
        </div>
        <app-btn normal>
            Get started
        </app-btn>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.success {
    width: 80%;
    &__board {
        border: 1px solid $color-primary;
        background: $color-white;
        padding: 2rem;
        color: $color-primary;
        margin: 3rem 0;
        border-radius: .5rem;
    }
}
</style>
