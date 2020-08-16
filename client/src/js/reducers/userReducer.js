const initialState = {
    user: null,
    error: null
}

function userReducer(state = initialState, action){
    switch(action.type){
        case "REGISTER_SUCCESS":
            return {
                ...state,
                error: null,
                user: action.payload
            };
        case "REGISTER_FAILURE":
            return {
                ...state,
                error: action.payload,
                user: null
            };
        default:
            return state;
    }
}

export default userReducer;
