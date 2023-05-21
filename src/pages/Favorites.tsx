import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardComponent from '../components/CardComponent';
import { ColorGreen } from '../utils/constans';

const useStyles = makeStyles((theme) => ({
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

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
}

function FavoritesList() {
  const classes = useStyles();
  const [favorites, setFavorites] = useState<Person[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (name: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((favorite) => favorite.name !== name);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Actualizar el localStorage
      return updatedFavorites;
    });
  };

  if (favorites.length === 0) {
    return (
      <Container className={classes.container}>
        <Typography className={classes.text}>No favorites found.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {favorites.map((person) => (
          <CardComponent
            key={person.name}
            person={person}
            onRemoveFavorite={() => handleRemoveFavorite(person.name)}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default FavoritesList;
