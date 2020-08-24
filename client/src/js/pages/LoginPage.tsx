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
            <div className="login-page">
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Email Address *</label>
                            <input className="form-control" type="email" name="username" id="username" onChange={ this.handleChange }/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password">Password *</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={ this.handleChange }/>
                        </div>

                        <button className="btn btn-primary w-100" type="submit">Login</button>
                    </form>
                </div>
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
