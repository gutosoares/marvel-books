import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as ShoppingCartActions from '../../store/actions/shoppingCart'
import {
  Snackbar,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { DeleteOutlined } from '@material-ui/icons'
import { HeroContent } from '../../components'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  comicsList: {
    width: '100%',
    backgroundColor: '#424242',
  },
  comicsListItem: {
    color: '#E2E8F0',
  },
  price: {
    color: '#fff',
    display: 'inline',
    fontWeight: 'bold',
    fontSize: 18,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 30,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fafafa'
  },
  emptyContent: {
    color: '#fafafa',
  }
}))


function Checkout({ history, comics, dispatch }) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(false)

  const handleShowSnackbar = (message) => {
    setMessage(message)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  function checkout() {
    handleShowSnackbar('Compra realizada com sucesso!')
    setTimeout(() => {
      dispatch(ShoppingCartActions.checkoutShoppingCart())
      history.push('/')
    }, 1500)
  }

  function totalValue() {
    return comics.reduce((acc, value) => {
      return acc + value.prices[0].price
    }, 0)
  }

  function removeItem(index) {
    handleShowSnackbar('Item removido com sucesso!')
    dispatch(ShoppingCartActions.removeShoppingCart(index))
  }

  return (
    <Fragment>
      <HeroContent
        title="Finalize o seu pedido" />
      <Container maxWidth="md">
      { comics.length ? (
        <Fragment>
          <List className={classes.comicsList}>
            {comics.map((comic, index) => (
              <ListItem key={index} alignItems="flex-start" className={classes.comicsListItem}>
                <ListItemAvatar>
                  <Avatar alt={comic.title} variant="square" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={comic.title}
                  secondary={
                    <Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.price}
                        color="textSecondary"
                      >
                        ${comic.prices[0].price}
                      </Typography>
                    </Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeItem(index)}>
                    <DeleteOutlined />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText
                className={classes.totalValue}
                primary="Valor total"
              />
              <ListItemSecondaryAction>
                <Typography className={classes.totalValue}>
                  ${totalValue().toFixed(2)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <div className={classes.actions}>
            <Button
              color="primary"
              variant="text"
              onClick={() => history.push('/')}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => checkout()}
            >
              Finalizar pedido
            </Button>
          </div>
        </Fragment>
      ) : (
        <Typography className={classes.emptyContent} component="h2" variant="body1" align="center">
          Seu carrinho está vazio
        </Typography>
      )}
      </Container>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  )
}

export default connect(state => ({ comics: state.shoppingCart }))(Checkout)
