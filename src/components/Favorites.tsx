import { useState, useEffect } from 'react';
import {  IconButton, Avatar, CardHeader, Container, Grid, Card, Button, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import DeleteIcon from '@mui/icons-material/Delete';

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    avatar: {
      backgroundColor: theme.palette.primary.main
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
  })
);


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
      <Container>
        <Typography>No favorites found.</Typography>
      </Container>
      
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {favorites.map((person) => (
           <Grid item xs={12} sm={6} md={4} key={person.name}>
           <Card className={classes.root}>
             <CardHeader
               avatar={
                 <div aria-label="recipe" className={classes.avatarContainer}>
                   <img src="/wars.webp" alt="avatar" className={classes.avatarImg} />
                 </div>
               } 
               action={
                <IconButton aria-label="settings" onClick={() => handleRemoveFavorite(person.name)}>
                  <DeleteIcon />
                </IconButton>
              }
               title={person.name}
               subheader={`${person.height}, ${person.gender}`}
             />
             
           </Card>
         </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FavoritesList;
