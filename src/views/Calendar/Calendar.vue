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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 120rem;
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
    color: var(--textColor) !important
}
.vc-text-gray-800 {
    color: var(--mainColor);
}

// EXPENSES COLOOOOOR

.bg-mainColor {
    background: var(--mainColor) !important;
}

.bg-059782 {
  background: #059782 !important;
}
.bg-99a1d7 {
  background: #99a1d7 !important;
}
.bg-2bac49 {
  background: #2bac49 !important;
}
.bg-3144af {
  background: #3144af !important;
}
.bg-59bcd8 {
  background: #59bcd8 !important;
}
</style>
