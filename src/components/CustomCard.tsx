import { Grid, Card, CardHeader, IconButton, Button } from '@material-ui/core';
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import { ColorShadow, ColorBlack } from '../utils/constans';
import { stylesCard } from '../utils/Styles'
import {Person} from '../models'


interface CustomCardProps {
  person: Person;
  isFavorite?: (name: string) => boolean;
  onToggleFavorite?: (name: string) => void;
  onRemoveFavorite?: (name: string) => void;
  onViewFilms?: (films: string[]) => void;
}

const CustomCard = ({
  person,
  isFavorite,
  onToggleFavorite,
  onRemoveFavorite,
  onViewFilms,
}: CustomCardProps) => {
  const classes = stylesCard();

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
      <Card className={`${classes.root}`} style={{ backgroundColor: ColorShadow}}>
        <CardHeader
          avatar={
            <div aria-label="recipe" className={classes.avatarContainer}>
              <img src="/start.jpg" alt="avatar" className={classes.avatarImg} />
            </div>
          }
          action={
            onToggleFavorite ? (
              <IconButton aria-label="settings" onClick={handleToggleFavorite}>
                <FavoriteIcon color={isFavorite?.(person.name) ? 'secondary' : 'action'} />
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
          <div className={classes.buttonContainer}>
            <Button
              className={classes.bViewFilms}
              variant="contained"
              size="small"
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

export default CustomCard;
