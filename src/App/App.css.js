import {createMuiTheme, makeStyles} from "@material-ui/core";

const breakpoints = {
  values: {
    xs: 0,
    sm: 400,
    md: 700,
    lg: 900,
    xl: 1200,
  },
}
export const THEME = {
  dark: createMuiTheme({
    breakpoints,
    palette: {
      primary: {
        main: '#404040',
      },
      secondary: {
        main: '#c8b57d',
      }
    },
  }),

  light: createMuiTheme({
    breakpoints,
    palette: {
      primary: {
        main: '#ececec',
      },
      secondary: {
        main: '#c8b57d',
      }
    },
  }),
}

export const useStyles = theme => ({
  h100: {
    height: '100% !important'
  },
  keyboard: {
    boxShadow: '0 10px 30px black'
  },
  'used-ok': {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    }
  },
  'used-nok': {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    }
  },
  'reveal': {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
    }
  },
})