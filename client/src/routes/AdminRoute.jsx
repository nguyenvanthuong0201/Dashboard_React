import React from 'react'
import { Redirect, Route } from 'react-router'

const AdminRoute = ({ exact = false, path, children, user }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        !user ? (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ) : user.role === '0' ? (
          children
        ) : (
          <Redirect
            to={{ pathname: '/permission-denied', state: { from: location } }}
          />
        )
      }
    />
  )
}

export default AdminRoute
