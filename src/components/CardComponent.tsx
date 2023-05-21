import React from 'react';
import { Grid, Card, CardHeader, IconButton, Button } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import { ColorGreen, ColorShadow, ColorBlack, ColorLetterP } from '../utils/constans';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345
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
  })
);

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
}

interface CardComponentProps {
  person: Person;
  isFavorite: (name: string) => boolean;
  onToggleFavorite?: (name: string) => void;
  onRemoveFavorite?: (name: string) => void;
  onViewFilms?: (films: string[]) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  person,
  isFavorite,
  onToggleFavorite,
  onRemoveFavorite,
  onViewFilms,
}) => {
  const classes = useStyles();

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(person.name);
    }
  };

  const handleRemoveFavorite = () => {
    if (onRemoveFavorite) {
      onRemoveFavorite(person.name);
    }
  };

  const handleViewFilms = () => {
    if (onViewFilms) {
      onViewFilms(person.films);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={person.name}>
      <Card className={classes.root} style={{backgroundColor: ColorShadow}}>
        <CardHeader
          avatar={
            <div aria-label="recipe" className={classes.avatarContainer}>
              <img src="/start.jpg" alt="avatar" className={classes.avatarImg} />
            </div>
          }
          action={
            onToggleFavorite ? (
              <IconButton aria-label="settings" onClick={handleToggleFavorite}>
                <FavoriteIcon color={isFavorite(person.name) ? 'secondary' : 'action'} />
              </IconButton>
            ) : (
              <IconButton aria-label="settings" onClick={handleRemoveFavorite}>
                <DeleteIcon style={{ color: ColorBlack}} />
              </IconButton>
            )
          }
          titleTypographyProps={{ className: classes.title }}
          subheaderTypographyProps={{ className: classes.subheader }} 
          title={person.name}
          subheader={`${person.height}, ${person.gender}`}
        />
        {onViewFilms && (
          <div style={{ textAlign: 'center', marginBottom: '10px'}}>
            <Button
              style = {{backgroundColor: ColorGreen, color: ColorShadow, fontSize: '11px', fontWeight: 'bold'}}
              variant="contained"
              size="small"
              color="primary"
              onClick={handleViewFilms}
            >
              View Films
            </Button>
          </div>
        )}
      </Card>
    </Grid>
  );
};

export default CardComponent;
