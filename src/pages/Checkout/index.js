import React, { Fragment } from 'react'
import {
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
import { DeleteOutlined } from '@material-ui/icons'
import { HeroContent } from '../../components'
import { makeStyles } from '@material-ui/core/styles'

const comics = [1, 2, 3]

const useStyle = makeStyles(() => ({
  comicsList: {
    width: '100%',
    backgroundColor: '#424242',
  },
  comicsListItem: {
    color: '#E2E8F0',
  },
  inline: {
    display: 'inline',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  }
}))

function Checkout({ history }) {
  const classes = useStyle()

  return (
    <Fragment>
      <HeroContent
        title="Finalize o seu pedido" />
      <Container maxWidth="md">
        <List className={classes.comicsList}>
          {comics.map(comic => (
            <ListItem alignItems="flex-start" className={classes.comicsListItem}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" variant="square" src="http://i.annihil.us/u/prod/marvel/i/mg/c/00/5db8435bf1d1b.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Future Fight Firsts: Crescent And Io (2019) #1"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      Marvel
                    </Typography>
                    {" — $4.99"}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteOutlined />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
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
          onClick={() => {}}
        >
          Finalizar pedido
        </Button>
        </div>
      </Container>
    </Fragment>
  )
}

export default Checkout
