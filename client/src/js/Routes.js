import React, {Suspense} from 'react';
import '../scss/app.scss';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch, Link } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import rootReducer from "./reducers";
import history from "./history";

const middleware = [
    thunk,
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer(history),
    composeEnhancers(
        applyMiddleware(...middleware)
    ),
);

const Homepage = React.lazy(() => import("./pages/Homepage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));

function Routes() {
    return (
        <Provider store={ store }>
            <ConnectedRouter history={history}>
                <div className="site-content">
                    <Suspense fallback={'Loading'}>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/register" component={RegisterPage} />
                        </Switch>
                    </Suspense>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}

export default Routes;
