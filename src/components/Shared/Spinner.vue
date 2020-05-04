<template>
    <div class="lds-ring" :class="{'extra-large': extraLarge}">
        <div
          v-for="r in rings" :key="r"
          :class="{'extra-large': extraLarge}"
        >
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      rings: 4
    }
  },
  props: {
    color: String,
    extraLarge: Boolean
  }
}
</script>

<style scoped lang="scss" >
.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  &.extra-large {
    width: 100px;
    height: 100px;
    & div {
      width: 80px;
      height: 80px;
    }
  }
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 2px solid #fff;
    border-color: #fff transparent transparent transparent;
    &.extra-large {
      //  border: 3px solid #fff;
    }
    &:nth-child(1){
      animation-delay: -0.45s;
    }
    &:nth-child(2){
      animation-delay: -0.3s;
    }
    &:nth-child(3){
      animation-delay: -0.15s;
    }
  }
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
