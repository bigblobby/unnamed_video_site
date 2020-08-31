import React from 'react';
import Api from '../services/ApiService';

type UserChannelPageProps = {
    match: {params}
}

class UserChannelPage extends React.Component<UserChannelPageProps, {}> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Api.getUserChannel({
            username: this.props.match.params.username
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                User chanel
            </div>
        );
    }
}

export default UserChannelPage;
