import {createContext,useReducer} from  'react';
import githubReducer from './GithubReducer';
//The variable that is going to be exportes and that will hold all of teh values
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {    
//Children is whaterver we surround with the provider
const initialState = {
    users:[], 
    user:{},
    loading:false
}
const [state,dispatch] = useReducer(githubReducer,initialState) //Takes in the reducer we are using, and the initial state
// what we get from this is the state and the function dispatch
// Dispatch is used to diaptch an action to out reducer

//Get Search Results

const searchUsers = async (text) => {
    setLoading()
        const params = new URLSearchParams({
            q:text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{ // The query to fetch 
        headers: {
            Authorization:`token ${GITHUB_TOKEN}`}})

        const {items} = await response.json()
        
        dispatch({
            type:'GET_USERS',
            payload:items // this is how the data is being sent, as a payload 
        })
    }
    //Get a single user
    const getUser = async (login) => {
        setLoading()
        
            const response = await fetch(`${GITHUB_URL}/users/${login}`,{ // The query to fetch 
            headers: {
                Authorization:`token ${GITHUB_TOKEN}`}})

            if(response.status === 404){
                window.location = '/notfound'
            }else{
                const data = await response.json() //change {items} to data , {} is an array, data is singular
            
            dispatch({
                type:'GET_USER',
                payload:data // this is how the data is being sent, as a payload 
                //sending data or the single user returned in the response
            })
            }
        }
    //Set Loading 
    const setLoading = () => dispatch({
        type:'SET_LOADING'})
    
    //Clear users from state
    const clearUsers = () => dispatch ({
        type:'CLEAR_USERS'
    })

    return <GithubContext.Provider value = {{
        users:state.users,
        loading: state.loading,
        user:state.user,
        searchUsers, // also pass down fetch users, want to call that from teh user results
        clearUsers,
        getUser
    }} >
        {children}
    </GithubContext.Provider>
}
export default GithubContext