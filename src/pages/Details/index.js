import React, { Fragment, useState, useEffect } from 'react'
import { Container, Button, Typography, Grid } from '@material-ui/core'
import { Loading } from '../../components'
import { makeStyles } from '@material-ui/core/styles'
import { ShoppingCartOutlined } from '@material-ui/icons'
import { useParams } from 'react-router-dom'  
import { fetchComicById } from '../../services/comics'

const useStyle = makeStyles(theme => ({
  comicDetail: {
    display: 'flex',
    background: '#121212',
    flex: 1,
    padding: theme.spacing(4, 4)
  },
  comicImage: {
    maxWidth: 350,
    maxHeight: 550,
    marginRight: theme.spacing(2)
  },
  cover: {
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  },
  comicInfo: {
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  comicAuthor: {
    display: 'flex',
    alignItems: 'baseline',
  },
  comicAuthorName: {
    marginRight: theme.spacing(1),
  },
  comicActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}))

function Details({ history }) {
  const { id } = useParams()
  const classes = useStyle()

  const [comic, setComic] = useState({
    title: '',
    description: '',
    thumbnail: {},
    images: [{
      path: '',
      extension: ''
    }],
    prices: [{
      price: 0
    }],
    creators: {
      available: 0,
      items: [{
        role: '',
        name: ''
      }]
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true)
        const { data } = await fetchComicById(id)

        setComic(data.results[0])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [id])


  return (
    <Fragment>
      {loading ? <Loading /> : null}
      <Container maxWidth="lg">
        <div className={classes.comicDetail}>
          <div className={classes.comicImage}>
            <img 
              className={classes.cover} 
              src={`${comic.images[0].path}.${comic.images[0].extension}`} 
              alt={comic.title} />          
          </div>
          <div className={classes.comicInfo}>
            <div>
              <Typography variant="subtitle2" component="h4">
                Título:
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                {comic.title}
              </Typography>
              <Typography variant="subtitle2" component="h4">
                Descrição:
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                {comic.description ? comic.description : '-'}
              </Typography>
              <Typography variant="subtitle2" component="h4">
                {comic.creators.available >= 2 ? 'Autores' : 'Autor'}
              </Typography>
              <Grid container spacing={1}>
                {comic.creators.items.map(author => (
                  <Grid item xs={12} sm={6} md={4} key={author.name}>
                    <div className={classes.comicAuthor}>
                      <Typography className={classes.comicAuthorName} variant="h6" component="h2">
                        {author.name}
                      </Typography>
                      <Typography variant="subtitle2" component="h4">
                        {author.role}
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="subtitle2" component="h4">
                Preço:
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                {`$${comic.prices[0].price}`}
              </Typography>
            </div>
            <div className={classes.comicActions}>
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
                endIcon={<ShoppingCartOutlined />}
              >
                Comprar
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export default Details