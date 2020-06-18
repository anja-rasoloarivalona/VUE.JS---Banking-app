const addTransactionQuery = (input) => {
  return {
    query: `mutation {
          ${query('addTransaction', input)}
      }`
  }
}

const editTransactionQuery = (input) => {
  return {
    query: `mutation {
              ${query('editTransaction', input)}
          }`
  }
}

const deleteTransactionQuery = (input) => {
  return {
    query: `mutation {
        ${query('deleteTransaction', input)}
      }`
  }
}

const query = (action, input) => {
  return `${action}(transactionInput: {
          _id: "${input._id}",
          category: "${input.category}",
          subcategory: "${input.subcategory}",
          date: "${input.date}",
          counterparty: "${input.counterparty}",
          amount: "${input.amount}",
          details: "${input.details}",
          usedWalletId: "${input.walletId}",
          transactionType: "${input.transactionType.value}"
      }) { ${queryResult}}`
}
const queryResult = `
              monthlyReports {
                period
                income
                expense
                details {
                  category
                  subcategory
                  amount
                  used
                }
                transactions {
                  _id
                  category
                  subcategory
                  date
                  counterparty
                  amount
                  details
                  usedWalletId
                  transactionType
                  status
                }
              }
              wallets {
                  _id
                  walletType
                  amount
                  creditLimit
                  name
                  color
              }
              incomes {
                  _id
                  category
                  subcategory
                  amount
                  details
                  frequency {
                      counter
                      period
                  }
                  lastPayout
                  nextPayout
                  autoWriting
                  notification
                  color
              }
              expenses {
                  _id
                  category
                  subcategory
                  amount
                  expenseType
                  lastPayout
                  nextPayout
                  used
                  frequency {
                    counter
                    period
                  }
                  color
              }
  `

export { addTransactionQuery, editTransactionQuery, deleteTransactionQuery }
