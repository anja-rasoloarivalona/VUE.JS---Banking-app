<template>
    <div class="calendar dashboard__section">
       <h2 class="dashboard__section__title">Calendar</h2>
        <div class="calendar__content">
            <app-calendar is-expanded  :attributes="attrs" locale="en"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
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
    // console.log('attrs', attrs)
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

<style lang="scss" scoped>
.calendar {
  & h2 {
    margin-bottom: 2rem;
  }
    &__content {
        display: flex;
        justify-content: center;
        width: 100%;
    }
}
</style>
