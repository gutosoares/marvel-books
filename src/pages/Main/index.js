import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import * as ShoppingCartActions from '../../store/actions/shoppingCart'
import { makeStyles } from '@material-ui/core/styles'
import {
  Snackbar,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardContent
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
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

function Main({ history, dispatch }) {
  const classes = useStyles()

  const [comics, setComics] = useState([])
  const [comicsInfo, setComicsInfo] = useState({
    count: 0,
    total: 0,
    limit: 21,
    offset: 0
  })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleShowSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  async function fetchMoreData() {
    try {
      setLoading(true)
      const { data } = await fetchComics({ limit: comicsInfo.limit, offset: comicsInfo.offset })
      setComicsInfo({
        count: data.count,
        limit: data.limit + 21,
        offset: data.offset + 22,
        total: data.total || comicsInfo.total,
      })
      setComics([...comics, ...data.results])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  function addToShoppingCart(comic) {
    handleShowSnackbar()
    dispatch(ShoppingCartActions.addShoppingCart(comic))
  }

  return (
    <Fragment>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Quadrinho adicionado ao carrinho de compras
        </Alert>
      </Snackbar>
      <HeroContent
        logo={logo}
        altLogo="Marvel Comics"
        title="Melhor loja online para comprar os melhores quadrinhos da Marvel"
      />
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={(comicsInfo.count <= comicsInfo.total)}
        loader={ loading ? <Loading /> : null}
      >
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            { comics.map((comic, index) => (
              <Grid item key={`${comic.title}-${index}`} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    title={comic.title}
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
                      onClick={() => addToShoppingCart(comic)}
                    >
                      Adicionar ao carrinho
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </Fragment>
  )
}

export default connect()(Main)
