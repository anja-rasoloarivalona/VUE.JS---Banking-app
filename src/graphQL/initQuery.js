const initQuery = {
  query: `{
      user {
        email
        settings {
          theme
          currency
          dashboardLayout {
            x
            y
            w
            h
            i
            minH
            minW
            displayed
            ghostMode
          }
        }
        status
        activeDate
        goal {
         amount
         date
        }
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
      }
    }`
}

export { initQuery }
