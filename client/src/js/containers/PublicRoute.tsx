import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { verifyToken, setPrevUrl } from "../actions/userActions";

type PublicRouteProps = {
    verifyToken: () => {},
    setPrevUrl: (url) => {};
    location: {pathname};
    component: Element;
}

class PublicRoute extends React.Component<PublicRouteProps, {}> {
    componentDidMount() {
        this.props.setPrevUrl(this.props.location.pathname);
    }

    render() {
        const { component: Component } = this.props;

        return (
            <Route
                {...this.props}
                render={props => {
                    return (
                        // @ts-ignore
                        <Component {...props} />
                    )
                }}
            />
        );
    }
}

const mapDispatchToProps = { verifyToken, setPrevUrl };

export default connect(null, mapDispatchToProps)(PublicRoute);
