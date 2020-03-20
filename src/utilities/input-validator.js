const validator = (data) => {
  const errors = []
  for (const input in data) {
    if (data[input].length < 1) {
      errors.push(`${input} is required`)
    }
  }

  if (data.email) {
    const emailIsValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(data.email.trim())
    if (!emailIsValid) {
      errors.push('Please enter a valid email')
    }
  }

  if (data.name && data.name.trim().length < 3) {
    errors.push('Name should be at least 3 characters long')
  }
  if (data.password && data.password.trim().length < 5) {
    errors.push('Password should be at least 5 characters long')
  }
  return errors
}

export { validator }
