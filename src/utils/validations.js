export const validateFieldsLogin = (name, value, setErrorEmail, setErrorPass) => {
    if (name === 'email' && value.trim()) validateEmail(value, setErrorEmail)
    if (name === 'password' && value.trim()) validatePass(value, setErrorPass)
}

const validateEmail = (value, setState) => {
    return setState(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
}

const validatePass = (value, setState) => {
    return setState(!/.{6}/i.test(value))
}
