import React, { Fragment } from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  heroContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(8, 0, 6),
    width: '100%',
  },
  heroContainerLogo: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  heroLogo: {
    width: '100%',
  },
  heroContentSubtitle: {
    fontFamily: '"Bangers", cursive',
    marginTop: theme.spacing(2),
    color: '#ff677d',
    fontWeight: 300
  },
}))

function HeroContent({ logo, altLogo, title }) {
  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          {(logo && altLogo) && (
            <div className={classes.heroContainerLogo}>
              <img className={classes.heroLogo} src={logo} alt={altLogo} />
            </div>
          )}
          <Typography className={classes.heroContentSubtitle} variant="h5" align="center" paragraph>
            {title}
          </Typography>
        </Container>
      </div>
    </Fragment>
  )
}

export default HeroContent
