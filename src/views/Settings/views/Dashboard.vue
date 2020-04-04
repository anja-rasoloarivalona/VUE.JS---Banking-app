<template>
    <div class="dashboard">
        <div class="dashboard__explication">
           <p>Now you can drag any element to change its position. Feel free to resize it as well. Once you're done, click save.</p>
           <app-btn normal primary>Save</app-btn>
        </div>
        <dashboard-settings></dashboard-settings>
    </div>
</template>

<script>
import Dashboard from '@/views/Dashboard/Dashboard'
export default {
  components: {
    dashboardSettings: Dashboard
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &__explication {
        padding-left: 2rem;
        font-size: $font-m;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--app-line-color);
        // color: var(--app-title-color-secondary)
    }
}
</style>
