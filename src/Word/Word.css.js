import {makeStyles} from "@material-ui/core";
export const useWordStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '.5rem',
    '&>button': {
      flexGrow: 0,
      margin: '.2rem',
      '&[class*="visible"]:hover': {
        backgroundColor: theme.palette.secondary.main,
        cursor: 'default'
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        cursor: 'default'
      },
      '& i': {
        lineHeight: '1.75em'
      }
    },
  },
}))

export const useWordKeyStyle = makeStyles(theme => ({
  visible: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    boxShadow: theme.shadows[2],
    '&:hover': {
      boxShadow: theme.shadows[2]
    }
  }
}))