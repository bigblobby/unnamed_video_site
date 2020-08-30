import React, { useState } from 'react';
import { connect } from 'react-redux';
import {verifyToken} from "../actions/userActions";

function Homepage(props) {
    const callTest = () => {
        props.verifyToken();
    };

    return (
        <div>
            <h1>Homepage</h1>
            <button onClick={ callTest }>Click</button>
        </div>
    )
}

const mapDispatchToProps = { verifyToken };

export default connect(null, mapDispatchToProps)(Homepage);
