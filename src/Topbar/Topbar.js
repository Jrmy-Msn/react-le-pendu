import React from 'react'
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core"

import brand from '../resources/images/falling_stikman_64.svg'
import {useStyles} from './Topbar.css.js'
import {CogIcon} from "react-line-awesome";

const Topbar = ({game, gameAction}) => {
  const classes = useStyles()
  return (
    <AppBar position="static" color={'primary'}>
      <Toolbar>
        <Typography variant="h4" className={`${classes.typo}`}>
          LE PENDU
          <img src={brand} alt={'Homme pendu par la jambe'}/>
        </Typography>
        { game ?
          <Button variant={'outlined'}
            color={'secondary'}
            onClick={() => gameAction()}>Rejouer</Button> : null
        }
        <IconButton
            aria-label="paramètres"
            className={`${classes.settings}`}
            size={'small'}>
          <CogIcon className={'la-lg'} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar