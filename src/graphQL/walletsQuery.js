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
        walletType: "${input.walletType.value}",
        amount: "${input.amount}",
        name: "${input.name}",
        color: "${input.color}",
        creditLimit: "${input.creditLimit}"
    }) {
        _id
        walletType
        amount
        name
        color
        creditLimit
    }`
}

export { addWallet, editWallet }
