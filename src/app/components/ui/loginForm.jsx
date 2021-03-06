import React, { useEffect, useState } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
import { useAuth } from "../../hooks/useAuth"
import { useHistory } from "react-router-dom"

const LoginForm = () => {
  const history = useHistory()
  // console.log("history", history.location.state.from.pathname)
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false
  })
  const [errors, setErrors] = useState({})
  const { signIn } = useAuth()

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfog = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателкн для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состаять миниму из 8 символов",
        value: 8
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfog)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { email, password } = data

    try {
      await signIn({ email, password })
      history.push(
        history.location.state ? history.location.state.from.pathname : "/"
      )
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
