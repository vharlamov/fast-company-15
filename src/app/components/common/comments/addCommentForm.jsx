import React, { useState } from "react"
import TextAreaField from "../form/textAreaField"
import { validator } from "../../../utils/validator"
import PropTypes from "prop-types"
// const initialData = { userId: "", content: "" }

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfog = {
    // userId: {
    //   isRequired: {
    //     message: "Выберите от чьего имени вы хотите отправить сообщение"
    //   }
    // },
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfog)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const clearForm = () => {
    setData({})
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  // const arrayOfUsers =
  //   users &&
  //   Object.keys(users).map((userId) => ({
  //     name: users[userId].name,
  //     value: users[userId]._id
  //   }))

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content || ""}
          onChange={handleChange}
          name="content"
          label="Сообщение"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </div>
  )
}
AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddCommentForm
