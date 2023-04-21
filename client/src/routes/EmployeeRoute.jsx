import React from 'react'
import { Redirect, Route } from 'react-router'

const EmployeeRoute = ({ exact = false, path, children, user }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        !user ? (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ) : user.role === '1' ? (
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

export default EmployeeRoute
