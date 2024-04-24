import React, { useContext } from 'react'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'

const EditorPage = () => {
    const { appData: { access_token } } = useContext(UserContext)
  return (
    access_token ? "Editor Page Successfully Rendered" : <Navigate to='/signin'/>
  )
}

export default EditorPage
