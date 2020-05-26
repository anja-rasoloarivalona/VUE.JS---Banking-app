const addWallet = input => {
  return {
    query: `mutation {
            ${query('addWallet', input)}
        }`
  }
}

const editWallet = input => {
  return {
    query: `mutation {
            ${query('editWallet', input)}
        }`
  }
}

const query = (action, input) => {
  return `${action}(walletInput: {
        _id: "${input._id}",
        walletType: "${input.walletType}",
        amount: "${input.amount}",
        supplier: "${input.supplier}",
        color: "${input.color}",
        creditLimit: "${input.creditLimit}"
    }) {
        _id
        walletType
        amount
        creditLimit
        supplier
        color
    }`
}

export { addWallet, editWallet }
