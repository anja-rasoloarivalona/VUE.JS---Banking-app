const addTransactionQuery = (input) => {
  return {
    query: `mutation {
        ${query('addTransaction', input)}
    }`
  }
}

const editTransactionQUery = (input) => {
  return {
    query: `mutation {
            ${query('editTransaction', input)}
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
        usedWallet: "${input.usedWallet}",
        walletId: "${input.walletId}",
        status: "${input.status}",
        transactionType: "${input.transactionType}",
        category: "${input.category}"
    }) { ${queryResult}}`
}
const queryResult = `
            transaction {
                _id
                shortId
                date
                name
                counterparty
                amount
                details
                usedWallet
                status
                transactionType
                category
                owner
            }
            wallets {
                _id
                walletType
                amount
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
                owner
                frequency {
                counter
                period
                }
            }
`

export { addTransactionQuery, editTransactionQUery }
