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
          date: "${input.date}",
          name: "${input.name}",
          counterparty: "${input.counterparty}",
          amount: "${input.amount}",
          details: "${input.details}",
          usedWalletId: "${input.walletId}",
          status: "${input.status}",
          transactionType: "${input.transactionType}",
          category: "${input.category}"
      }) { ${queryResult}}`
}
const queryResult = `
              monthlyReports {
                period
                income
                expense
                transactions {
                  _id
                  shortId
                  date
                  name
                  counterparty
                  amount
                  details
                  usedWalletId
                  status
                  transactionType
                  category
                }
              }
              wallets {
                  _id
                  walletType
                  amount
                  creditLimit
                  supplier
                  shortId
                  color
              }
              incomes {
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
              }
              expenses {
                  _id
                  name
                  amount
                  category
                  expenseType
                  lastPayout
                  nextPayout
                  used
                  frequency {
                  counter
                  period
                  }
              }
  `

export { addTransactionQuery, editTransactionQuery, deleteTransactionQuery }
