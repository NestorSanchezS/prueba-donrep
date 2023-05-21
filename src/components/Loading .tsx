import CircularProgress from '@material-ui/core/CircularProgress';
import { stylesLoading } from '../utils/Styles'

export default function MyComponent() {
  const classes = stylesLoading()
  return (
    <div className={classes.container}>
      <CircularProgress disableShrink className={classes.colorCircular} />
    </div>
  );
}
