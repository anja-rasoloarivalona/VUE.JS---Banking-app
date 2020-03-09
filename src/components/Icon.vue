<template functional>
  <svg class="icon"
       :viewBox="$options.methods.getViewBox(props)"
       :class="$options.methods.getStyleClasses(props)"
       v-bind="data.attrs"
       v-on="listeners">
    <path :d="$options.methods.getPath(props)"/>
  </svg>
</template>

<script>
import icons from '../assets/icons.json'
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
<style scoped>
/* default */
.icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
  cursor: pointer;
}

/* sizes */
.icon.large {
  width: 2rem;
  height: 2rem;
}

.icon.extra-large {
  width: 3rem;
  height: 3rem;
}

/* colors */
.grey {
 fill:#b1afaf
}
</style>
