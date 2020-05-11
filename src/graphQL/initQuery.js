const initQuery = {
  query: `{
      user {
        settings {
          theme
          dashboardLayout {
            x
            y
            w
            h
            i
            displayed
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
          budget {
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
