import {fade, makeStyles} from "@material-ui/core";
export const useStyle = makeStyles(theme => ({
  paper: {
   backgroundColor: theme.palette.primary.main,
 },
  text: {
    color: theme.palette.primary.contrastText,
  },
  dividers: {
    borderColor: fade(theme.palette.primary.contrastText, .8),
  },
  underline: {
    "&:before": {
      borderColor: fade(theme.palette.primary.contrastText, .7),
    },
    '&:hover': {
      '&:not(.Mui-disabled)': {
        '&:before': {
          borderColor: theme.palette.primary.contrastText,
        }
      }
    }
  },
  accordion: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '& .MuiAccordionSummary-content': {
      flexDirection: 'column',
    },
    '& .MuiAccordionSummary-expandIcon': {
      color: theme.palette.primary.contrastText,
    },
  },
  accordionHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  accordionSecondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: fade(theme.palette.primary.contrastText, .8),
  },
  form: {
    width: '100%',
  },

}))