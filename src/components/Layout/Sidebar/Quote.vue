<template>
    <transition name="appear" mode="in-out" appear v-if="isDisplayed && imageIsDisplayed">
        <div class="quote">
                <div class="quote__layer"></div>
                <img :src="getImgUrl(quote.name)" :alt="quote.alt"/>
                <transition name="fade" mode="out-in" appear v-if="quoteIsDisplayed">
                    <div class="quote__content" :class="{hide: auth.isResettingPassword}">
                        <div class="quote__content__mark">
                            <app-icon name="quote" color="dark" size="extra-large" />
                        </div>
                        <div class="quote__text">{{ quote.text}}</div>
                        <div class="quote__author"><b>{{quote.author}}</b></div>
                    </div>
                </transition>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      quoteIsDisplayed: false,
      imageIsDisplayed: false
    }
  },
  watch: {
    isDisplayed: {
      handler: 'shoudQuoteBeDisplayed',
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
    currentQuoteIsMounted () {
      if (this.currentQuoteIndex === this.index) {
        return true
      } else return false
    }
  },
  methods: {
    getImgUrl (name) {
      return require('../../../assets/quotes/' + name)
    },
    shoudQuoteBeDisplayed (isDisplayed) {
      if (isDisplayed) {
        setTimeout(() => this.setImageIsDisplayedToTrue(), 1000)
        setTimeout(() => this.setQuoteIsDisplayedToTrue(), 3000)
      } else {
        this.quoteIsDisplayed = false
        this.imageIsDisplayed = false
      }
    },
    setQuoteIsDisplayedToTrue () {
      this.quoteIsDisplayed = true
    },
    setImageIsDisplayedToTrue () {
      this.imageIsDisplayed = true
    }
  },
  props: {
    quote: Object,
    isDisplayed: Boolean
  }
}
</script>

<style lang="scss" scoped>
.quote {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    & img {
        // object-fit: cover;
        // position: absolute;
        // top: 0;
        // left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    &__content {
        position: absolute;
        z-index: 4;
        bottom: 10rem;
        padding-left: 8rem;
        right: 10rem;
        color: $color-white;
        &.hide {
          display: none;
        }
        &__mark {
            position: absolute;
            transform: translate(-2.4rem, -1.7rem);
        }
    }
    &__text {
        font-size: 2.2rem;
        position: relative;
        z-index: 5;
    }
    &__author {
        font-size: 1.5rem;
        margin-top: 2rem;
        text-align: end;
        color: var(--textColor--dark);
    }
    &__layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background-image: linear-gradient(to bottom left,
        //       rgb(29, 29, 29) 10%,
        //     #1b1b1b6b );
         background-image: linear-gradient(to bottom left,
            rgb(29, 29, 29) 1%,
            #1b1b1b6b 50%);
        z-index: 3;
    }
}
</style>
