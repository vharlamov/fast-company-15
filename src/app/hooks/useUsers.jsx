import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import userService from "../services/user.service"
import { toast } from "react-toastify"

const UserContext = React.createContext()

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  const getUser = (id) => {
    return users.find((user) => user._id === id)
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function errorCatcher(error) {
    const { message } = error.response.data

    setError(message)
  }

  return (
    <UserContext.Provider value={{ users, getUser }}>
      {!isLoading ? children : "Users Loading..."}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UserProvider
