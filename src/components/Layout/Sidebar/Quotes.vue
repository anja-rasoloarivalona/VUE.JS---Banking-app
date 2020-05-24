<template>
    <div class="quotes">
        <quote
            v-for="(quote, index) in quotes"
            :key="index"
            :quote="quote"
            :isDisplayed="currentQuoteIndex === index"
        />
    </div>
</template>

<script>
import Quote from './Quote'
export default {
  data () {
    return {
      currentQuoteIndex: 0,
      quotes: [
        {
          text: 'Beware of little expenses. A small leak will sink a great ship',
          author: 'Benjamin Franklin',
          name: 'ship.jpg',
          alt: 'Ship'
        },
        {
          text: 'Every time you borrow money, you’re robbing your future self',
          author: 'Nathan W. Morris',
          name: 'borrow.jpg',
          alt: 'Borrow'
        },
        {
          text: 'Money is a terrible master but an excellent servant',
          author: 'P.T. Barnum',
          name: 'master.jpg',
          alt: 'Master'
        }
      ]
    }
  },
  mounted () {
    setInterval(() => this.goToNextQuote(this.currentQuoteIndex + 1), 30000)
  },
  methods: {
    goToNextQuote (index) {
      'going to next quote'
      if (index === this.quotes.length) {
        this.currentQuoteIndex = 0
      } else {
        this.currentQuoteIndex = index
      }
    }
  },
  components: {
    Quote
  }
}
</script>

<style lang="scss" scoped>

</style>
