import React from 'react'
import {useContext} from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'


function UserResults() {
    //These Value come from the return GitHubCOntext.Provider values in GithubContext
    const {users, loading} = useContext(GithubContext)
   
   
    /*empty dependency, only run when the component loads, ([] included at the end),
     or else will infinitley keep loading*/

    //Fetch the users forn the Api, enter the url ftom the .env file, add '/user' to get the users. 
    
    if(!loading){
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {/* goes through each element in users. We naem each component as user, for each display user.login */}
                {users.map((user) => (
                 <UserItem key = {user.id} user = {user}/>
                ))}
            </div>
          )
    }
    else{
        return (
        <Spinner/>
        )
    }
}
export default UserResults