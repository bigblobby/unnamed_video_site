import React, {Suspense} from 'react';
import '../scss/app.scss';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch, Link } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import rootReducer from "./reducers";
import history from "./history";
import Header from "./components/Header";
import PrivateRoute from "./containers/PrivateRoute";
import PublicRoute from "./containers/PublicRoute";
import GuestRoute from "./containers/GuestRoute";


const middleware = [
    thunk,
    routerMiddleware(history)
];

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(
    rootReducer(history),
    composeEnhancers(
        applyMiddleware(...middleware)
    ),
);

const Homepage = React.lazy(() => import("./pages/Homepage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const PostCreatePage = React.lazy(() => import("./pages/PostCreatePage"));
const PostListPage = React.lazy(() => import("./pages/PostListPage"));

function Routes() {
    return (
        <Provider store={ store }>
            <ConnectedRouter history={history}>
                <div className="site-content">
                    <Header />

                    <Suspense fallback={'Loading'}>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <GuestRoute exact path="/login" component={LoginPage} />
                            <GuestRoute exact path="/register" component={RegisterPage} />
                            <PrivateRoute exact path="/post-create" component={PostCreatePage} />
                            <PublicRoute exact path="/posts" component={PostListPage} />
                        </Switch>
                    </Suspense>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}

export default Routes;
