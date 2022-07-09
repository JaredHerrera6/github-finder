import {createContext,useReducer} from  'react';
import { createRenderer } from 'react-dom/test-utils';
import githubReducer from './GithubReducer';

//The variable that is going to be exportes and that will hold all of teh values
const GithubContext = createContext();

export const GithubProvider = ({children}) => {    
//Children is whaterver we surround with the provider
const initialState = {
    users:[], 
    user:{},
    repos:[],
    loading:false
}
const [state,dispatch] = useReducer(githubReducer,initialState) //Takes in the reducer we are using, and the initial state
// what we get from this is the state and the function dispatch
// Dispatch is used to diaptch an action to out reducer
    
    return <GithubContext.Provider value = {{
        ...state,
        dispatch,
    }} >
        {children}
    </GithubContext.Provider>
}
export default GithubContext