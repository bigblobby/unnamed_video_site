import React from 'react';
import ApiService from "../services/ApiService";

class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    callTest = () => {
        ApiService.getTest()
            .then(result => console.log(result));
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        ApiService.post('/user/signup', {
           username: this.state.username,
           email: this.state.email,
           password: this.state.password
        }).then(result => {
            console.log(result);
        });
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <button onClick={this.callTest}>Click</button>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" onChange={this.handleInputChange}/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={this.handleInputChange}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={this.handleInputChange}/>

                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default Homepage;
