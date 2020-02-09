import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#1b1b1b',
    color: '#eee',
  },
  copyright: {
    color: '#eee',
  }
}))

function Copyright() {
  return (
    <Typography variant="body2" align="center" color="inherit">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          Marvel Comcis
        </Typography>
        <Copyright />
      </Container>
    </footer>
  )
}

export default Footer
