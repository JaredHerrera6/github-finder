
import React from 'react'
import {useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
function UserSearch() {
    const [text,setText] = useState('')

    //Get the Users from githubContext, search users, and clearUsers
    const {users, searchUsers,clearUsers} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)
    
    const handleChange = (e) => setText(e.target.value)
    //e is event and SetText to e.target.value

    const handleSubmit = (e) => {
        e.preventDefault() // since it is a form submit 
        
        if(text === ''){ 
            //setAlert function from Alert Context, takes in message and type
            setAlert('Please Enter Something', 'error')
        }
        else{
            //Gets the search users Const(function) from context, and pass in text prop
            searchUsers(text)
            setText('') // resets the form to empty after the entered user has been searched for
        }
    }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 
    lg:grid-cols-2 md:grid-cols-2 mb-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black" 
                        placeholder='Search'
                        value={text}
                        onChange={handleChange}
                        />
                        <button type='submit' className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Go</button>
                    </div>
                </div>
            </form>
        </div>
        {users.length > 0 && ( //using && is like if only using if without an else, ? : in if and else
            <div>
            <button onClick = {clearUsers} className="btn btn-ghost btn-lg">Clear</button> 
            
        </div>
        ) }
    </div>
  )
}

export default UserSearch