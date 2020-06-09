const setCurrency = currency => {
  return {
    query: `mutation {
          setCurrency(currency: "${currency}")
        }`
  }
}

export { setCurrency }
