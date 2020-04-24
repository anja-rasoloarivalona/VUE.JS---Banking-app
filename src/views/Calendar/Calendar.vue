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
            class: 'orangered'
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
    console.log(this.attrs)
    transactions.forEach(transaction => {
      attrs.push({
        key: transaction.name,
        dot: transaction.color,
        popover: {
          label: transaction.name
        },
        dates: [new Date(transaction.lastPayout)]
      })
    })
    console.log(attrs)
    // this.attrs = attrs
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
// .vc-highlight {
//     background: orangered !important;
// }

.orangered {
    background: orangered !important;
}
</style>
