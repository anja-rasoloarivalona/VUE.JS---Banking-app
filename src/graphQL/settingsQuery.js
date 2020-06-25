const setCurrency = currency => {
  return {
    query: `mutation {
          setCurrency(currency: "${currency}")
        }`
  }
}

const setThemeQuery = theme => {
  return {
    query: `mutation {
        setTheme(theme: "${theme}")
    }`
  }
}

export { setCurrency, setThemeQuery }
