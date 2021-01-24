import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  typo: {
    fontFamily: 'fantasy',
    position: 'relative',
    flexGrow: 1,
    textAlign: 'left',
    '&>img': {
      position: 'absolute',
      top: '27px',
      left: '60px',
    }
  },
  settings: {
    color: theme.palette.primary.light,
    marginLeft: '1rem'
  }
}))