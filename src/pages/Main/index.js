import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Snackbar
} from '@material-ui/core'
import logo from '../../assets/MarvelLogo.svg'
import { fetchComics } from '../../services/comics'
import { Loading, HeroContent } from '../../components'

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    flex: 1
  },
  price: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: '#ff677d'
  }
}))

function Main({ history }) {
  const classes = useStyles()

  const [comics, setComics] = useState([])
  const [comicsInfo, setComicsInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(false)

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true)
        const { data } = await fetchComics()
        setComicsInfo({
          count: data.count,
          limit: data.limit,
          offset: data.offset,
          total: data.total
        })
        setComics(data.results)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setSnackbar(false)
  }

  function addToCart(comic) {
    setSnackbar(false)

    console.log('comic add to shopping cart', comic)
  }

  return (
    <Fragment>
      {loading ? <Loading /> : null }
      <HeroContent
        logo={logo}
        altLogo="Marvel Comics"
        title="Melhor loja online para comprar os melhores quadrinhos da Marvel" />
      <Container className={classes.cardGrid} maxWidth="md">
      <Snackbar
          open={snackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={() => handleClose()}
          message="This is a success message!" />
        <Grid container spacing={4}>
          { comics.map(comic => (
            <Grid item key={comic.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={comic.thumbnail? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : 'https://source.unsplash.com/random'}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.title} gutterBottom variant="h5" component="h3">
                    {comic.title}
                  </Typography>
                  <div className={classes.price}>
                    <Typography variant="h5" component="p">
                      {`$${comic.prices[0].price}`}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={() => history.push(`/comics/${comic.id}`)}
                  >
                    Detalhes
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => addToCart(comic)}
                  >
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  )
}

export default Main
