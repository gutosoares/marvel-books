import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Badge, Toolbar, Typography, IconButton } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#fff',
  },
  toolbar: {
    height: '75px',
    width: '100%',
    padding: '10px 45px',
    backgroundColor: '#1b1b1b',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarTitle: {
    fontFamily: '"Bangers", cursive',
    color: '#fff',
    textDecoration: 'none',
    flex: 1,
    overflow: 'inherit'
  }
}))

function Header({ comics }) {
  const classes = useStyles()

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <Typography
              component="h1"
              variant="h4"
              noWrap
              className={classes.toolbarTitle}>
              MComics
            </Typography>
          </Link>
          <Link to="/checkout">
            <IconButton>
              <Badge color="secondary" badgeContent={comics.length}>
                <ShoppingCartOutlined
                  className={classes.icon}
                  fontSize="large" />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default connect(state => ({ comics: state.shoppingCart }))(Header)
