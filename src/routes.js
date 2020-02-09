import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './pages/Main'
import Details from './pages/Details'
import Checkout from './pages/Checkout'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/comics/:id" component={Details} />
      <Route path="/checkout" component={Checkout} />
    </Switch>
  )
}

export default Routes
