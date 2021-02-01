import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  accountIcon: {
    fontSize: '8rem',
  },
  menu: {
    width: '100%',
  },
}));

export default useStyles;
