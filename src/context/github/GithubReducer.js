const githubReducer = (state, action)=> {
    switch (action.type){
        case 'GET_USERS':
            return{
                ...state, //This will return the current state
                users: action.payload,
                loading:false,
            }
        case 'GET_USER':
            return{
                ...state,
                user: action.payload,
                loading:false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading:true

            }
        case 'CLEAR_USERS':
            return{
                ...state, //gets the current state 
                users:[], // sets the user to an empty array 
            }
        default:
            return state
    }
}

export default githubReducer