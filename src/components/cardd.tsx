import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    avatar: {
      backgroundColor: theme.palette.primary.main
    }
  })
);

const ImgMediaCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => handleViewFilms(person.films)}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      :)
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <FavoriteIcon />
                    </IconButton>
                  }
                  title={person.name}
                  subheader={`${person.height}, ${person.gender}`}
                />
              </Card>
  );
}

export default ImgMediaCard;
