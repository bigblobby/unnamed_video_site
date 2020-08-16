import ApiService from "../services/ApiService";
import TokenService from "../services/TokenService";

// Action types
const userRegisterSuccessAction = (user) => ({
    type: 'REGISTER_SUCCESS',
    payload: {
        user: user,
        error: null
    }
});

const userRegisterFailureAction = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: {
        user: null,
        error: error
    }
});

// Action creators

export function userRegister(data){
    return (dispatch) => {
        ApiService.registerUser(data)
            .then(result => {
                console.log(result);
                dispatch(userRegisterSuccessAction(result.user));
                TokenService.setToken(result.token);
            }).catch(err => {
                console.log(err);
                dispatch(userRegisterFailureAction(err.error));
            });
    }
}

function userLogin(){

}
