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
          color
        }
      }
    }`
}

export { initQuery }
