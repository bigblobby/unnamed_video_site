import React, { useState } from 'react';
import ApiService from "../services/ApiService";

function Homepage(props) {
    const callTest = () => {
        ApiService.getTest()
            .then(result => console.log(result));
    };

    return (
        <div>
            <h1>Homepage</h1>
            <button onClick={ callTest }>Click</button>
        </div>
    )
}

export default Homepage;
