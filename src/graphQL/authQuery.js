const loginQuery = input => {
  return {
    query: `{
            login(email: "${input.email}", password: "${input.password}") {
                token
                user {
                    _id
                    name
                    status
                    wallets {
                      _id
                      walletType
                      amount
                      supplier
                      shortId
                      color
                    }
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
                }
            }
        }`
  }
}

const signupQuery = input => {
  return {
    query: `mutation {
            createUser(userInput: {
                email: "${input.email}",
                name: "${input.name}",
                password: "${input.password}"
            }) {
                token
                user {
                    _id
                    name
                    status
                }
            }
        }`
  }
}

export { loginQuery, signupQuery }
