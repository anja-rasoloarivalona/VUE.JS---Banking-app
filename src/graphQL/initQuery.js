const initQuery = {
  query: `{
      user {
        email
        settings {
          theme
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
        status
        goal {
         amount
         date
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
        wallets {
          _id
          walletType
          amount
          creditLimit
          supplier
          color
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
    }`
}

export { initQuery }
