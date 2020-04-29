<template functional>
  <svg class="icon"
       :viewBox="$options.methods.getViewBox(props)"
       :class="$options.methods.getStyleClasses(props)"
       v-html="$options.methods.getPath(props)"
       v-bind="data.attrs"
       v-on="listeners">
  </svg>
</template>

<script>
import icons from '@/assets/icons.json'
export default {
  props: {
    name: String,
    size: String,
    color: String,
    viewBox: String
  },
  methods: {
    getPath (props) {
      return icons[props.name]
    },
    getViewBox (props) {
      return icons[`${props.name}-view-box`]
    },
    getStyleClasses (props) {
      return [props.size, props.color].map(val => val && val)
    }
  }
}
</script>
<style scoped lang="scss">
/* default */
.icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
  cursor: pointer;
  transition: all .3s ease-in;
}

/* sizes */
.icon.large {
  width: 2rem;
  height: 2rem;
}

.icon.xlarge {
  width: 2.5rem;
  height: 2.5rem;
}

.icon.extra-large {
  width: 3rem;
  height: 3rem;
}

.icon.xxl {
  width: 5rem;
  height: 5rem;
}

/* colors */

.primary {
  fill: var(--mainColor);
}

.secondary {
  fill: var(--textColor--dark);
}
.surface {
  fill: var(--surfaceColor)
}

.white {
  fill: $color-white
}

.red {
  fill: $color-red
}

.green {
  fill: $color-green
}

.grey {
 fill:$color-grey--light
}
.grey--dark {
  fill: $color-grey--dark
}

</style>
