import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {userLogin} from "../actions/userActions";

function LoginPage(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch();
    const previousUrl = props.location.state?.from.pathname;

    function handleSubmit(e){
        e.preventDefault();

        dispatch(userLogin({
            username: username,
            password: password
        }, previousUrl));
    }

    return (
        <div>
            <h1>The login page</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={ (e) => setUsername(e.target.value) }/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={ (e) => setPassword(e.target.value) }/>

                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default LoginPage;
