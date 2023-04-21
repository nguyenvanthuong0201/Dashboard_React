import React from 'react'
import { Redirect, Route } from 'react-router'

const GuestRoute = ({ exact = false, path, children, user }) => {
    return (
        <Route
            exact={exact}
            path={path}
            render={() => (!user || !user.authenticated ? children : <Redirect to={{ pathname: '/' }} />)}
        />
    )
}

export default GuestRoute
