const addExpenseQuery = input => {
  return {
    query: `mutation {
              ${query('addExpense', input)}
          }`
  }
}

const editExpenseQuery = input => {
  return {
    query: `mutation {
              ${query('editExpense', input)}
          }`
  }
}

const query = (action, input) => {
  return `${action}(expenseInput: {
                  _id: "${input._id}",
                  category: "${input.genre.category.name}",
                  subcategory: "${input.genre.subcategory.name}"
                  amount: "${parseInt(input.amount)}",
                  used: "${input.used}",
                  expenseType: "${input.expenseType.value}",
                  frequency: {
                      counter: "${input.frequency.counter.value}",
                      period: "${input.frequency.period.value}"
                  }
                  lastPayout: "${input.lastPayout.toString()}",
                  color: "${input.color}",
                  alreadyUsedThisCurrentMonth: "${input.alreadyUsedThisCurrentMonth}"
              }) {
                _id
                category
                subcategory
                amount
                expenseType
                currentPeriod
                frequency {
                    counter
                    period
                }
                lastPayout
                nextPayout
                used
                color
              }`
}

export { addExpenseQuery, editExpenseQuery }
