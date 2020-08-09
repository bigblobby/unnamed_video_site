import React from 'react';
import ApiService from "../services/ApiService";

class Homepage extends React.Component {

    // componentDidMount() {
    //     ApiService.getTest()
    //         .then(result => console.log(result));
    // }

    callTest = () => {
        ApiService.getTest()
            .then(result => console.log(result));
    };

    render() {
        return <div>Homepage <button onClick={this.callTest}>Click</button></div>
    }
}

export default Homepage;
