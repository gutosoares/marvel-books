import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Details from './pages/Details'
import Checkout from './pages/Checkout'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/comics/:id" component={Details} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </Router>
  )
}

export default Routes