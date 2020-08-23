import React from 'react';
import { connect, useDispatch } from "react-redux";
import { userLogin } from "../actions/userActions";

type LoginPageState = {
    username: string;
    password: string;
    previousUrl: string;
}

type LoginPageProps = {
    userLogin: (user, url) => {}
}


class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            previousUrl: props.location?.state?.from.pathname
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.userLogin({
            username: this.state.username,
            password: this.state.password
        }, this.state.previousUrl)
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        } as { [K in keyof LoginPageState]: LoginPageState[K] } );
    }

    render(){
        return (
            <div>
                <h1>The login page</h1>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" onChange={ this.handleChange }/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={ this.handleChange }/>

                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({userReducer}) => {
    const {user, error} = userReducer;
    return {
        user,
        error
    }
};

const mapDispatchToProps = { userLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
