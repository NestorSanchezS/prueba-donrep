import { makeStyles } from '@material-ui/core';
import { ColorGreen, ColorShadow, ColorBlack, ColorLetterP, ColorGreen2 } from './constans';

export const stylesModal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    backgroundColor: ColorShadow,
    maxWidth: 600,
    margin: '0 auto',
    marginTop: 20,
    border:`2px solid ${ColorGreen}`,
    borderRadius: '7px', 
  },
  tittle: {
    color: ColorGreen,
    marginBottom:"7px"
  },
  subtittle:{
    color:ColorLetterP,
  },
  p:{
    marginTop:'7px',
    color:ColorBlack,
  }
}));

export const stylesLoading = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh'
  },
  colorCircular:{
    color: ColorGreen
  }
}));

export const stylesCard = makeStyles(() => ({
    root: {
      maxWidth: 345
    },
    card:{
      backgroundColor: ColorShadow,
    },
    avatarContainer: {
      width: 60,
      height: 60,
    },
    avatarImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    title: {
      color: ColorLetterP,
      fontWeight: 'bold',
      fontSize:"16px"
    },
    subheader: {
      color: ColorBlack,
    },
    bViewFilms:{
      backgroundColor: ColorGreen,
    '&:hover': {
      backgroundColor: ColorGreen2,
    }, 
      color: ColorShadow, 
      fontSize: '11px', 
      fontWeight: 'bold'
    },
    buttonContainer:{
      textAlign: 'center', 
      marginBottom: '10px'
    }
}));

export const stylesFavorites = makeStyles(()=>({
   container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  text: {
    fontSize: '2rem',
    color: ColorGreen, 
  },
}));

export const stylesCustomAppBar = makeStyles(()=>({
    buttomCharacters:{
    marginRight: '20px', 
    textTransform: 'none', 
    color: 'white', 
    fontSize: '1.5rem', 
    ontWeight: 'bold'
  }
}));