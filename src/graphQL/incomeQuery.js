const addIncomeQuery = input => {
  return {
    query: `mutation {
            ${query('addIncome', input)}
        }`
  }
}

const editIncomeQuery = input => {
  return {
    query: `mutation {
            ${query('editIncome', input)}
        }`
  }
}

const query = (action, input) => {
  return `${action}(incomeInput: {
                _id: "${input._id}",
                name: "${input.name}",
                amount: "${parseInt(input.amount)}",
                from: "${input.from}",
                frequency: {
                    counter: "${input.frequency.counter.value}",
                    period: "${input.frequency.period.value}"
                }
                lastPayout: "${input.lastPayout.toString()}",
                autoWriting: "${input.autoWriting.value}",
                notification: "${input.notification.value}",
                color: "${input.color}"
            }) {
                _id
                name
                amount
                from
                frequency {
                    counter
                    period
                }
                lastPayout
                nextPayout
                autoWriting
                notification
                color
            }`
}

export { addIncomeQuery, editIncomeQuery }
