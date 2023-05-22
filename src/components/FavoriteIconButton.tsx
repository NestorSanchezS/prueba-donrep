import {useLocation, Link} from "react-router-dom";
import {IconButton}  from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';

function FavoriteIconButton() {
  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorites";

  return (
    <IconButton
      component={Link}
      to="/favorites"
      color="inherit"
      style={{ fontSize: "24px", color: isFavoritesPage ? "red" : "white" }}
    >
      <FavoriteIcon />
    </IconButton>
  );
}
    

export default FavoriteIconButton;

