import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import CustomCard from '../components/CustomCard';
import { stylesFavorites } from '../utils/Styles';
import { Person } from '../models';

function Favorites() {
  const classes = stylesFavorites();
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
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
          <CustomCard
            key={person.name}
            person={person}
            onRemoveFavorite={() => handleRemoveFavorite(person.name)}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default Favorites;
