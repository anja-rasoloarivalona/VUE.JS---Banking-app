const updateDashboardLayoutQuery = (layout) => {
  const d = {}
  layout.forEach(item => {
    d[item.i] = {
      h: item.h,
      w: item.w,
      x: item.x,
      y: item.y,
      i: item.i,
      displayed: true
    }
  })
  return {
    query: `mutation {
        updateDashboardLayout(
          input: {
            available: {h: "${d.available.h}", w: "${d.available.w}", x: "${d.available.x}", y: "${d.available.y}", i: "${d.available.i}", displayed: "${d.available.displayed}"},
            balance: {h: "${d.balance.h}", w: "${d.balance.w}", x: "${d.balance.x}", y: "${d.balance.y}", i: "${d.balance.i}", displayed: "${d.balance.displayed}"},
            budget: {h: "${d.budget.h}", w: "${d.budget.w}", x: "${d.budget.x}", y: "${d.budget.y}", i: "${d.budget.i}", displayed: "${d.budget.displayed}"},
            expenses: {h: "${d.expenses.h}", w: "${d.expenses.w}", x: "${d.expenses.x}", y: "${d.expenses.y}", i: "${d.expenses.i}", displayed: "${d.expenses.displayed}"},
            goal: {h: "${d.goal.h}", w: "${d.goal.w}", x: "${d.goal.x}", y: "${d.goal.y}", i: "${d.goal.i}", displayed: "${d.goal.displayed}"},
            history: {h: "${d.history.h}", w: "${d.history.w}", x: "${d.history.x}", y: "${d.history.y}", i: "${d.history.i}",  displayed: "${d.history.displayed}"},
            monthly: {h: "${d.monthly.h}", w: "${d.monthly.w}", x: "${d.monthly.x}", y: "${d.monthly.y}", i: "${d.monthly.i}", displayed: "${d.monthly.displayed}"},
            transactions: {h: "${d.transactions.h}", w: "${d.transactions.w}", x: "${d.transactions.x}", i: "${d.transactions.i}", y: "${d.transactions.y}", displayed: "${d.transactions.displayed}"},
            wallet: {h: "${d.wallet.h}", w: "${d.wallet.w}", x: "${d.wallet.x}", y: "${d.wallet.y}", i: "${d.wallet.i}", displayed: "${d.wallet.displayed}"},
            calendar: {h: "${d.calendar.h}", w: "${d.calendar.w}", x: "${d.calendar.x}", y: "${d.calendar.y}", i: "${d.calendar.i}", displayed: "${d.calendar.displayed}"}
            }
        ) {
            x
            y
            h
            w
            i
            displayed
            ghostMode
          }
        }
    `
  }
}

export { updateDashboardLayoutQuery }
