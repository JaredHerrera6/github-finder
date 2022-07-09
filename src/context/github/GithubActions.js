import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//create an instance of axios
const github = axios.create({
    baseURL:GITHUB_URL,
    headers:{Authorization:`token ${GITHUB_TOKEN}`}
})


//Get Search Results
export const searchUsers = async (text) => {
        const params = new URLSearchParams({
            q:text
        })
        const response = await github.get(`/search/users?${params}`)
        // axios gives the response including the json data, in an object called data
        //items array in the data
        return response.data.items
    }
    //Get user and repos
    //takes in the login
    export const getUserAndRepos  = async(login) => {
        //Promise.all takes in an array of requests
        const [user,repos] = await Promise.all ([
            github.get(`/users/${login}`), 
            github.get(`/users/${login}/repos`)
        ])
        //return an object with a user and repos
        return {user: user.data, repos:repos.data}
    }