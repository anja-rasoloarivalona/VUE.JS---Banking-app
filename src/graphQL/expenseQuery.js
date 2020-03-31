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
                  name: "${input.name}",
                  amount: "${parseInt(input.amount)}",
                  used: "${input.used}",
                  category: "${input.category}",
                  expenseType: "${input.expenseType}",
                  frequency: {
                      counter: "${input.frequency.counter}",
                      period: "${input.frequency.period}"
                  }
                  lastPayout: "${input.lastPayout.toString()}",
                  color: "${input.color}"
              }) {
                _id
                name
                amount
                category
                expenseType
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
