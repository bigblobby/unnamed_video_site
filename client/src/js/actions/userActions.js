import ApiService from "../services/ApiService";
import TokenService from "../services/TokenService";
import {push} from 'connected-react-router';

// Action types
const userRegisterSuccessAction = (user) => ({
    type: 'REGISTER_SUCCESS',
    payload: user
});

const userRegisterFailureAction = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error
});

const userLoginSuccessAction = () => ({});

const userLoginFailureAction = () => ({});

// Action creators
export function userRegister(data){
    return (dispatch) => {
        ApiService.registerUser(data)
            .then(result => {
                console.log(result);
                dispatch(userRegisterSuccessAction(result.user));
                TokenService.setToken(result.token);
                dispatch(push('/'));
            }).catch(err => {
                console.log(err);
                dispatch(userRegisterFailureAction(err.error));
            });
    }
}

export function userLogin(data, previousUrl = '/'){
    return (dispatch) => {
        ApiService.loginUser(data)
            .then(result => {
                dispatch(userRegisterSuccessAction(result.user));
                TokenService.setToken(result.token);
                dispatch(push(previousUrl));
            }).catch(err => {
                console.log(err);
                dispatch(userRegisterFailureAction(err.error));
            });
    }
}
