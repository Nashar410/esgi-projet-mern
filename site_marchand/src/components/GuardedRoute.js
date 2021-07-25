import React from 'react';
import {Route, Redirect} from "react-router-dom";

const GuardedRoute = ({component: Component, auth, ...rest}) => {
    //
    // if(auth() && !!isLogin) {
    //     return <Redirect to="/panier" />
    // }

    return (
        <Route {...rest} render={(props) => (
            auth()
                ? <Component {...props} />
                : <Redirect to="/"/>
        )}>
        </Route>
    );
};

export default GuardedRoute;
