import React from 'react';
import { Link} from 'react-router-dom';
import { AppBar, Toolbar, Button} from '@material-ui/core';
import { ColorGreen } from '../utils/constans';
import FavoriteIconButton from './FavoriteIconButton';
import { stylesCustomAppBar } from '../utils/Styles';

interface AppBarProps {
  children: React.ReactNode;
}

const CustomAppBar = ({ children }:AppBarProps): JSX.Element => {
  const classes = stylesCustomAppBar();
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: ColorGreen }}>
      <Toolbar>
        <Button component={Link} to="/" className={classes.buttomCharacters}>
          Start Wars Characters
        </Button>
        <div style={{ marginLeft: 'auto' }}>
          <FavoriteIconButton />
        </div>
      </Toolbar>
    </AppBar>
    {children}
    </>
    
  );
};

export default CustomAppBar;
