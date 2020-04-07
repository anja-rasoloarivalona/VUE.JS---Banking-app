<template>
    <div class="calendar">
        <app-calendar is-expanded :attributes="attrs" locale="en"/>
    </div>
</template>

<script>
export default {
  data () {
    return {
      attrs: [
        {
          key: 'today',
          dot: 'green',
          popover: {
            label: 'Rent'
          },
          dates: [new Date()]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.calendar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90%;
    padding-top: 3rem;
}
.vc-min-w-full {
    height: 100%;
}
.vc-relative {
    height: 100%;
}
.vc-grid-container.grid {
    height: 100%;
}
.vc-grid-cell {
    height: 100%;
}
.vc-pane {
    height: 100%;
    padding-top: 2rem;
}
.vc-header {
    margin-bottom: 2rem;
}
.vc-arrows-container {
    top: 2rem
}
.vc-h-full {
    display: flex;
    align-items: center;
}
.vc-text-gray-900 {
    color: var(--app-text-color) !important
}
.vc-text-gray-800 {
    color: var(--app-color-main);
}
</style>
