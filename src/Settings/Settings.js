import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  Accordion, AccordionDetails, AccordionSummary,
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, FormControlLabel, FormLabel,
  Grid, Radio, Switch,
  TextField, Typography, useMediaQuery, useTheme
} from "@material-ui/core";
import {useStyle} from "./Settings.css";
import {AngleDownIcon, MoonIcon, SunIcon} from "react-line-awesome";

const Settings = ({open, nbTries, randomWordLength, wordLength, onThemeChange, onValid, onCancel}) => {
  const classes = useStyle()
  const theme = useTheme()
  const [length, setLength] = useState(wordLength)
  const [tries, setTries] = useState(nbTries)
  const [random, setRandom] = useState(randomWordLength)
  const [word, setWord] = useState('')
  const [wordError, setWordError] = useState(false)
  const [wordExpanded, setWordExpanded] = useState(false)
  const [wordLengthExpanded, setWordLengthExpanded] = useState(false)
  const [wordRadio, setWordRadio] = useState(false)
  const [wordLengthRadio, setWordLengthRadio] = useState(true)

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleValidClick = () => {
    if (wordRadio && !(3 <= word.length && word.length <= 20) ) {
      setWordError(true)
      setWordExpanded(true)
    } else {
      setWordError(false)
      onValid({tries, length, random, word})
    }
  }
  const handleCancelClick = () => {
    const isWord = word.length >= 3
    setTries(nbTries)
    setRandom(randomWordLength)
    setLength(wordLength)
    setWordExpanded(isWord)
    setWordLengthExpanded(!isWord)
    setWordError(false)
    setWord(word)
    setWordRadio(isWord)
    setWordLengthRadio(!isWord)
    onCancel()
  }
  const handleTriesChange = (event) => {
    setTries(Number.parseInt(event.target.value))
  }
  const handleLengthChange = (event) => {
    setLength(Number.parseInt(event.target.value))
  }
  const handleWordChange = (event) => {
    setWord(event.target.value)
  }
  const handleWordLengthExpandChange = (event, expanded) => {
    setWordLengthExpanded(expanded)
    setWordExpanded(false)
    setWordRadio(false)
  }
  const handleWordExpandChange = (event, expanded) => {
    setWordExpanded(expanded)
    setWordLengthExpanded(false)
    setWordLengthRadio(false)
  }
  const handleWordLengthRadioChange = (event) => {
    setWordLengthRadio(event.target.checked)
    setWordExpanded(false)
    setWordRadio(false)
    setWordError(false)
  }
  const handleWordRadioChange = (event) => {
    setWordRadio(event.target.checked)
    setWordLengthExpanded(false)
    setWordLengthRadio(false)
  }
  const handleRandomChange = (event) => {
    event.target.checked = !random
    setRandom(!random)
  }

  return (
    <Dialog
      classes={{paper: classes.paper}}
      fullScreen={fullScreen}
      maxWidth={'sm'}
      open={open}
      onBackdropClick={onCancel}
      aria-labelledby="settings">
      <DialogTitle
        id="max-width-dialog-title"
        className={classes.text}
        disableTypography={true}>
        <Grid container justify={'space-between'}>
          <Grid item container alignItems={'center'} xs={6}>
            <Typography variant={'h6'}>Paramétrage</Typography>
          </Grid>
          <Grid item container justify={'flex-end'} xs={4}>
            <FormControlLabel
              className={classes.text}
              value="dark"
              control={<Switch checked={theme.props.name === 'light'} checkedIcon={<SunIcon />} icon={<MoonIcon />} color="secondary"/>}
              aria-label="choix-theme"
              onChange={onThemeChange}/>
          </Grid>
        </Grid>
      </DialogTitle>
      <Accordion
        square={true}
        expanded={wordLengthExpanded || wordLengthRadio}
        classes={{root: classes.accordion}}
        onChange={handleWordLengthExpandChange}>
        <AccordionSummary
          expandIcon={<AngleDownIcon/>}
          aria-controls="parametrage-mot"
          id="word-setting-length">
          <FormControlLabel
            aria-label="parametre-mot-aleatoire"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Radio checked={wordLengthRadio || wordLengthExpanded} name="word-radio"
                            onChange={handleWordLengthRadioChange}/>}
            label="Mot aléatoire"
          />
          <Typography className={classes.accordionSecondaryHeading}>Choix de la taille</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form noValidate className={classes.form}>
            <Grid container alignItems={'center'} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="word_length"
                  label="Longueur du mot"
                  type="number"
                  color={'secondary'}
                  fullWidth={true}
                  disabled={random}
                  InputLabelProps={{
                    classes: {root: classes.text}
                  }}
                  InputProps={{
                    inputProps: {min: 3, max: 20},
                    classes: {root: classes.text, underline: classes.underline}
                  }}
                  onChange={handleLengthChange}
                  value={length}/>
              </Grid>
              <Grid item xs={2}>
                <FormLabel className={classes.text}>OU</FormLabel>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  className={classes.text}
                  size="small"
                  value="Aléatoire"
                  checked={random}
                  control={<Switch size="small" color="secondary"/>}
                  label="Aléatoire"
                  labelPlacement="top"
                  onChange={handleRandomChange}/>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square={true}
        expanded={wordExpanded || wordRadio}
        classes={{root: classes.accordion}}
        onChange={handleWordExpandChange}>
        <AccordionSummary
          expandIcon={<AngleDownIcon/>}
          aria-controls="choix-mot"
          id="word-setting-value">
          <FormControlLabel
            aria-label="parametre-mot-personalisé"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Radio checked={wordRadio || wordExpanded} name="word-radio" onChange={handleWordRadioChange}/>}
            label="Mot personnalisé"
          />
          <Typography className={classes.accordionSecondaryHeading}>Choix du mot à découvrir</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form noValidate className={classes.form}>
            <Grid container alignItems={'center'} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="word_value"
                  label="Mot à découvrir"
                  placeholder={'pendu'}
                  type="text"
                  error={wordError}
                  required={wordRadio}
                  color={'secondary'}
                  helperText={wordError && <span>Définissez un mot ou sélectionner <i>Mot aléatoire</i></span>}
                  fullWidth={true}
                  focused={wordExpanded || wordRadio}
                  InputLabelProps={{
                    classes: {root: classes.text}
                  }}
                  InputProps={{
                    inputProps: {min: 3, max: 20},
                    classes: {root: classes.text, underline: classes.underline}
                  }}
                  onChange={handleWordChange}
                  value={word}/>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
      <DialogContent dividers classes={{dividers: classes.dividers}}>
        <DialogContentText className={classes.text}>
          Choisissez le nombre de tentative maximale pour découvrir le mot.
        </DialogContentText>
        <form noValidate>
          <Grid container alignItems={'center'} spacing={2}>
            <Grid item container xs={12} sm={6}>
              <TextField
                id="tries"
                label="Nombre de tentative"
                type="number"
                color={'secondary'}
                fullWidth={true}
                InputLabelProps={{
                  classes: {root: classes.text}
                }}
                InputProps={{
                  inputProps: {min: 1, max: 11, step: 1},
                  classes: {root: classes.text, underline: classes.underline}
                }}
                onChange={handleTriesChange}
                value={tries}/>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleValidClick} variant={'contained'} color="secondary">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  randomWordLength: PropTypes.bool.isRequired,
  nbTries: PropTypes.number.isRequired,
  wordLength: PropTypes.number.isRequired,
  onValid: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Settings