import React from 'react'
import PropTypes from 'prop-types'
import {AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography, useTheme} from "@material-ui/core"

import brand from '../resources/images/falling_stikman_64.svg'
import {useStyles} from './Topbar.css.js'
import {CogIcon} from "react-line-awesome";

const Topbar = ({game, settingsAction, gameAction}) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color={'primary'}>
        <Toolbar>
          <Typography variant="h4" className={`${classes.typo}`}>
            LE PENDU
            <img src={brand} alt={'Homme pendu par la jambe'}/>
          </Typography>
          { game ?
            <Button variant={theme.props.name === 'dark' ? 'outlined' : 'contained'}
              color={'secondary'}
              disableElevation={true}
              onClick={gameAction}>Rejouer</Button> : null
          }
          <IconButton
            id={'settings'}
            aria-label="paramètres"
            className={`${classes.settings}`}
            size={'small'}
            onClick={settingsAction}>
            <CogIcon className={'la-lg'} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

Topbar.propsTypes = {
  game: PropTypes.bool.isRequired,
  settingsAction: PropTypes.func.isRequired,
  gameAction: PropTypes.func.isRequired
}

export default Topbar