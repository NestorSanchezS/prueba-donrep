import React from 'react';
import { ListItem, ListItemText, ListItemIcon, IconButton, Snackbar } from '@material-ui/core';
import { Favorite, Close } from '@material-ui/icons';

function Favorites() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleAddToFavorites = () => {
    setFavorites((prevFavorites) => [...prevFavorites, 'Character Name']);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary={favorite} />
          </ListItem>
        ))}
      </ul>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Added to Favorites"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default Favorites;
