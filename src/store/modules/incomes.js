const state = {
  incomesList: {
    i18: 'incomes',
    iconName: 'coins',
    color: 'red',
    category: {
      'Family Benefits': {
        i18: 'familyBenifits',
        iconName: 'baby'
      },
      Gift: {
        i18: 'gift',
        iconName: 'gift'
      },
      'Checks & Discount vouchers': {
        i18: 'checks&DiscountVouchers',
        iconName: 'money-check-alt'
      },
      'Contributions & Subsidies': {
        i18: 'contributions&Subsidies',
        iconName: 'check-circle'
      },
      'Interest & Dividends': {
        i18: 'interest&Dividends',
        iconName: 'funnel-dollar'
      },
      'Lottery & Gambling': {
        i18: 'lottery&Gambling',
        iconName: 'dice-three'
      },
      'Rental income': {
        i18: 'rentalIncome',
        iconName: 'warehouse'
      },
      'Loan, Rental': {
        i18: 'loanRental',
        iconName: 'handshake'
      },
      Refunds: {
        i18: 'refunds',
        iconName: 'undo-alt'
      },
      Salary: {
        i18: 'salary',
        iconName: 'hand-holding-usd'
      },
      Sale: {
        i18: 'sale',
        iconName: 'share'
      }

    }
  }
}

const getters = {
  incomesList: state => {
    return state.incomesList
  }
}

export default {
  state,
  getters
}
