import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ColorGreen } from '../utils/constans';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh'
  },
};

export default function MyComponent() {
  return (
    <div style={styles.container}>
      <CircularProgress disableShrink style={{color: ColorGreen}} />
    </div>
  );
}
