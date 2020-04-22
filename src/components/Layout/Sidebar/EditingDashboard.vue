<template>
    <div class="edit-dashboard">
        <p>Feel free to change place or resize any elements of the dashboard</p>
        <div class="edit-dashboard__list">
            <h3>Displayed items</h3>
            <div class="edit-dashboard__list__item" v-for="(item, key) in dashboardItems" :key="key">
                <div class="edit-dashboard__list__item__key">{{ key }}</div>
                <input type="checkbox" :checked="item"/>
            </div>
        </div>
        <div class="edit-dashboard__cta">
            <app-btn normal secondary @click.native="submit">Save</app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      dashboardItems: {}
    }
  },
  mounted () {
    const dashboardItems = {}
    this.dashboardData.defaultDashboardLayout.forEach(item => {
      let key
      if (item.i.split('-').length > 2) {
        key = `${item.i.split('-')[1]} ${item.i.split('-')[2]}`
      } else {
        key = item.i.split('-')[1]
      }
      dashboardItems[key] = true
    })
    this.dashboardItems = dashboardItems
    console.log(this.dashboardData.currentDashboardLayout)
  },
  watch: {
    // dashboardItems: function (items) {
    //   const current = this.dashboardData.currentDashboardLayout

    // }
  },
  computed: {
    ...mapGetters([
      'dashboardData'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentDashboardLayout'
    ]),
    submit: async function () {
      console.log('items', this.dashboardData.currentDashboardLayout)
      const d = {}
      this.dashboardData.currentDashboardLayout.forEach(item => {
        d[item.i.split('-')[1]] = {
          h: item.h,
          w: item.w,
          x: item.x,
          y: item.y,
          displayed: true
        }
      })
      console.log('d', d)
      const graphqlQuery = {
        query: `mutation {
                updateDashboardLayout(
                  available: {h: "${d.available.h}", w: "${d.available.w}", x: "${d.available.x}", y: "${d.available.y}", displayed: "${d.available.displayed}"},
                  balance: {h: "${d.balance.h}", w: "${d.balance.w}", x: "${d.balance.x}", y: "${d.balance.y}", displayed: "${d.balance.displayed}"},
                  budget: {h: "${d.budget.h}", w: "${d.budget.w}", x: "${d.budget.x}", y: "${d.budget.y}", displayed: "${d.budget.displayed}"},
                  expenses: {h: "${d.expenses.h}", w: "${d.expenses.w}", x: "${d.expenses.x}", y: "${d.expenses.y}", displayed: "${d.expenses.displayed}"},
                  goal: {h: "${d.goal.h}", w: "${d.goal.w}", x: "${d.goal.x}", y: "${d.goal.y}", displayed: "${d.goal.displayed}"},
                  monthly: {h: "${d.monthly.h}", w: "${d.monthly.w}", x: "${d.monthly.x}", y: "${d.monthly.y}", displayed: "${d.monthly.displayed}"},
                  transactions: {h: "${d.transactions.h}", w: "${d.transactions.w}", x: "${d.transactions.x}", y: "${d.transactions.y}", displayed: "${d.transactions.displayed}"},
                  wallet: {h: "${d.wallet.h}", w: "${d.wallet.w}", x: "${d.wallet.x}", y: "${d.wallet.y}", displayed: "${d.wallet.displayed}"},
                ) {
                            x
                            y
                            w
                            h
                            i
                            }
            }
          `
      }
      try {
        console.log(graphqlQuery)
        const response = axios.post('/', graphqlQuery)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-dashboard {
    width: 100%;
    height: 80%;
    background: var(--surfaceColor);
    padding: 1rem;
    border-radius: .5rem;
    & h3 {
        margin-bottom: 2rem;
        text-align: center;
        color: var(--textColor--dark)
    }
    &__list {
        // background: red;
        margin-top: 4rem;
        font-size: $font-m;
        padding: 0 1rem;
        &__item {
            display: flex;
            align-items: center;
            // background: yellow;
            margin: 2rem 0;
            justify-content: space-between;
            width: 100%;
            &__key {
                text-transform: capitalize;
                color: var(--textColor--dark)
                // background: blue;
            }
            & input {
                cursor: pointer;
            }
        }
    }
}
</style>
