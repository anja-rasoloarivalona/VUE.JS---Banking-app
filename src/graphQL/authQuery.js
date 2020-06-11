const loginQuery = input => {
  return {
    query: `{
            login(email: "${input.email}", password: "${input.password}") {
                token
                user {
                    _id
                    name
                    email
                    status
                    goal {
                      amount
                      date
                    }
                    settings {
                      theme
                      currency
                      dashboardLayout {
                        x
                        y
                        w
                        h
                        i
                        displayed
                        ghostMode
                      }
                    }
                    wallets {
                      _id
                      walletType
                      amount
                      name
                      creditLimit
                      color
                    }
                    monthlyReports {
                        period
                        income
                        expense
                        details {
                          _id
                          amount
                          used
                        }
                        transactions {
                          _id
                          budgetId
                          date
                          counterparty
                          amount
                          details
                          usedWalletId
                          status
                          transactionType
                        }
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
                      color
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
                      color
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
                    email
                }
            }
        }`
  }
}

const verifyCodeQuery = code => {
  return {
    query: `mutation {
      verifyUserCode(code:"${code}")
    }
    `
  }
}

export { loginQuery, signupQuery, verifyCodeQuery }
