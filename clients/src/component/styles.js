import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  ul: {
    justifyContent: 'space-around',
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      
    },
  },
}));