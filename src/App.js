import './App.css'

import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core'
import Routes from './routes'
import store from './store'

import Header from './components/Header'
import Footer from './components/Footer'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#121212',
  },
}))

function App() {
  const classes = useStyles()

  return (
    <Router>
      <Provider store={store}>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <Container
            component="main"
            className={classes.main}>
            <Routes />
          </Container>
          <Footer />
        </div>
      </Provider>
    </Router>
  )
}

export default App
