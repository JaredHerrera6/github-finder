import React from 'react'
import {useEffect, useContext} from 'react'
import GithubContext from '../context/github/GithubContext'
import {useParams} from 'react-router-dom'

function User() {
  const {getUser, user} = useContext(GithubContext)

  const params = useParams()

  useEffect(() =>{
    getUser(params.login)
  },[]) //MAke sure to add this empty function to only run once

  return (
    <div>{user.login}</div>
  )
  
}

export default User