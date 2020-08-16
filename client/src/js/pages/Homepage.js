import React, { useState } from 'react';
import ApiService from "../services/ApiService";
import { userRegister } from '../actions/userActions';
import { useDispatch } from "react-redux";

function Homepage() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch();

    const callTest = () => {
        ApiService.getTest()
            .then(result => console.log(result));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(userRegister({
            username: username,
            email: email,
            password: password
        }));

        // ApiService.registerUser({
        //     username: username,
        //     email: email,
        //     password: password
        // }).then(result => {
        //     console.log(result);
        // });
    }

    return (
        <div>
            <h1>Homepage</h1>
            <button onClick={ callTest }>Click</button>

            <form onSubmit={ handleSubmit }>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={ (e) => setUsername(e.target.value) }/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={ (e) => setEmail(e.target.value) }/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={ (e) => setPassword(e.target.value) }/>

                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Homepage;
