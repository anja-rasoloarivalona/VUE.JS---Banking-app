<template>
    <div class="calendar">
        <app-calendar is-expanded :attributes="attrs" locale="en"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    //   attrs: null
      attrs: [
        {
          // key: 'today',
          highlight: {
            class: 'orangered'
          },
          popover: {
            label: 'Rent'
          },
          dates: [new Date('04/19/2020')]
        },
        {
          // key: 'tomorrow',
          highlight: {
            class: 'bg-059782'
          },
          popover: {
            label: 'LOL'
          },
          dates: [new Date()]
        }
      ]
    }
  },
  created () {
    const transactions = []
    const attrs = []
    for (const i in this.usersIncomesAndExpenses) {
      const transaction = this.usersIncomesAndExpenses[i]
      if (transaction.lastPayout && transaction.nextPayout) {
        transactions.push(transaction)
      }
    }
    transactions.forEach(transaction => {
      let customClass
      if (transaction.color && transaction.color !== 'undefined') {
        console.log(transaction.color === 'undefined')
        customClass = transaction.color.substring(1)
      } else {
        customClass = 'mainColor'
      }
      attrs.push({
        key: transaction.name,
        highlight: {
          class: `bg-${customClass}`
        },
        popover: {
          label: transaction.name
          // hideIndicator: true
        },
        dates: [new Date(transaction.lastPayout), new Date(transaction.nextPayout)]
      })
    })
    console.log('attrs', attrs)
    this.attrs = attrs
  },
  computed: {
    ...mapGetters([
      'usersIncomesAndExpenses',
      'secondaryColors'
    ])
  }
}
</script>

<style lang="scss">
.calendar {
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // max-width: 120rem;
    // // height: 90%;
    // padding-top: 3rem;
}

</style>
